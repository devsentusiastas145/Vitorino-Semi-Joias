import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const { Pool } = pg;
const app = express();

app.use(cors());
app.use(express.json());

// Pasta de uploads – criada automaticamente se não existir
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Serve os arquivos de imagem enviados
app.use("/uploads", express.static(uploadsDir));

// Configuração do multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext    = path.extname(file.originalname).toLowerCase();
    cb(null, `produto-${unique}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Apenas imagens são permitidas"));
  },
});

// POST – upload de imagem (admin)
app.post("/admin/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Nenhuma imagem recebida" });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// GET todos os produtos
app.get("/produtos", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT p.*,
        COALESCE(
          json_agg(pi.url ORDER BY pi.order_index) FILTER (WHERE pi.url IS NOT NULL),
          '[]'
        ) AS images
      FROM products p
      LEFT JOIN product_images pi ON pi.product_id = p.id
      GROUP BY p.id
      ORDER BY p.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// GET produto por ID
app.get("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(`
      SELECT p.*,
        COALESCE(
          json_agg(pi.url ORDER BY pi.order_index) FILTER (WHERE pi.url IS NOT NULL),
          '[]'
        ) AS images
      FROM products p
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.id = $1
      GROUP BY p.id
    `, [id]);

    if (rows.length === 0) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

// POST criar pagamento (MercadoPago)
app.post("/criar-pagamento", async (req, res) => {
  try {
    const { cart } = req.body;

    const items = cart.map(item => ({
      title: item.name,
      unit_price: Number(item.price),
      quantity: Number(item.qty),
      currency_id: "BRL"
    }));

    const preference = await mercadopago.preferences.create({
      items,
      back_urls: {
        success: `${req.protocol}://${req.get('host')}/sucesso.html`,
        failure: `${req.protocol}://${req.get('host')}/erro.html`
      },
      auto_return: "approved"
    });

    res.json({ init_point: preference.body.init_point });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

// POST salvar pedido
app.post("/pedidos", async (req, res) => {
  const client = await pool.connect();
  try {
    const { customer, cart, total } = req.body;

    await client.query("BEGIN");

    const customerRes = await client.query(
      `INSERT INTO customers (name, email, cpf, address)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      [customer.name, customer.email, customer.cpf, customer.address]
    );
    const customerId = customerRes.rows[0].id;

    const orderRes = await client.query(
      `INSERT INTO orders (customer_id, total, status) VALUES ($1, $2, 'pending') RETURNING id`,
      [customerId, total]
    );
    const orderId = orderRes.rows[0].id;

    for (const item of cart) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES ($1, $2, $3, $4)`,
        [orderId, item.id, item.qty, item.price]
      );
    }

    await client.query("COMMIT");
    res.json({ success: true, orderId });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar pedido" });
  } finally {
    client.release();
  }
});

// ============================================
// ADMIN ROUTES
// ============================================

// GET dashboard stats
app.get("/admin/stats", async (req, res) => {
  try {
    const [ordersRow, customersRow, productsRow] = await Promise.all([
      pool.query("SELECT COUNT(*) as total, COALESCE(SUM(total),0) as revenue FROM orders"),
      pool.query("SELECT COUNT(*) as total FROM customers"),
      pool.query("SELECT COUNT(*) as total FROM products"),
    ]);
    const pendingRow = await pool.query("SELECT COUNT(*) as total FROM orders WHERE status = 'pending'");
    res.json({
      totalOrders:    parseInt(ordersRow.rows[0].total),
      totalRevenue:   parseFloat(ordersRow.rows[0].revenue),
      totalCustomers: parseInt(customersRow.rows[0].total),
      totalProducts:  parseInt(productsRow.rows[0].total),
      pendingOrders:  parseInt(pendingRow.rows[0].total),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar estatísticas" });
  }
});

// GET all orders with customer info and items
app.get("/admin/pedidos", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        o.id, o.total, o.status, o.created_at,
        c.name  AS customer_name,
        c.email AS customer_email,
        c.cpf,
        c.address,
        COALESCE(
          json_agg(
            json_build_object('name', p.name, 'qty', oi.qty, 'price', oi.unit_price)
          ) FILTER (WHERE p.id IS NOT NULL),
          '[]'
        ) AS items
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      LEFT JOIN order_items oi ON oi.order_id = o.id
      LEFT JOIN products p ON p.id = oi.product_id
      GROUP BY o.id, c.name, c.email, c.cpf, c.address
      ORDER BY o.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
});

// PUT update order status
app.put("/admin/pedidos/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const valid = ['pending', 'processing', 'completed', 'cancelled'];
    if (!valid.includes(status)) return res.status(400).json({ error: "Status inválido" });
    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [status, id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar status" });
  }
});

// GET all customers with order stats
app.get("/admin/clientes", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        c.*,
        COUNT(o.id)              AS order_count,
        COALESCE(SUM(o.total),0) AS total_spent
      FROM customers c
      LEFT JOIN orders o ON o.customer_id = c.id
      GROUP BY c.id
      ORDER BY c.id DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

// POST create product (admin)
app.post("/admin/produtos", async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, category, price, original_price, badge, is_new, is_bestseller, description, material, image, images } = req.body;
    await client.query("BEGIN");
    const { rows } = await client.query(
      `INSERT INTO products (name, category, price, original_price, badge, is_new, is_bestseller, description, material, image)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      [name, category, price, original_price || null, badge || null, is_new, is_bestseller, description, material, image]
    );
    const productId = rows[0].id;
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await client.query(
          "INSERT INTO product_images (product_id, url, order_index) VALUES ($1,$2,$3)",
          [productId, images[i], i]
        );
      }
    }
    await client.query("COMMIT");
    res.json({ success: true, id: productId });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Erro ao criar produto" });
  } finally {
    client.release();
  }
});

// PUT update product (admin)
app.put("/admin/produtos/:id", async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const { name, category, price, original_price, badge, is_new, is_bestseller, description, material, image, images } = req.body;
    await client.query("BEGIN");
    await client.query(
      `UPDATE products
       SET name=$1, category=$2, price=$3, original_price=$4, badge=$5, is_new=$6,
           is_bestseller=$7, description=$8, material=$9, image=$10
       WHERE id=$11`,
      [name, category, price, original_price || null, badge || null, is_new, is_bestseller, description, material, image, id]
    );
    if (images !== undefined) {
      await client.query("DELETE FROM product_images WHERE product_id = $1", [id]);
      for (let i = 0; i < images.length; i++) {
        await client.query(
          "INSERT INTO product_images (product_id, url, order_index) VALUES ($1,$2,$3)",
          [id, images[i], i]
        );
      }
    }
    await client.query("COMMIT");
    res.json({ success: true });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  } finally {
    client.release();
  }
});

// DELETE product (admin)
app.delete("/admin/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM product_images WHERE product_id = $1", [id]);
    await pool.query("DELETE FROM order_items WHERE product_id = $1", [id]);
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

// Serve os arquivos do site (HTML, CSS, JS, imagens)
// Dotfiles (.env etc.) são bloqueados automaticamente
app.use(express.static(__dirname, { dotfiles: 'deny', index: 'index.html' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});