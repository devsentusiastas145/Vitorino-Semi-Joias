import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const app = express();

app.use(cors());
app.use(express.json());

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
        success: "http://localhost:5500/sucesso.html",
        failure: "http://localhost:5500/erro.html"
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

app.listen(3000, () => {
  console.log("Backend rodando em http://localhost:3000");
});