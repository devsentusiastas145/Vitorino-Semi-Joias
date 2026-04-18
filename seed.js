import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const products = [
  {
    name: 'Colar Lua Crescente', category: 'colares',
    price: 189.90, original_price: 239.90,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    ],
    badge: 'new', is_new: true, is_bestseller: true,
    description: 'Delicado colar com pingente lua crescente, banhado a ouro 18k. Corrente ajustável de 45 a 50cm. Uma peça que emana mistério e sofisticação.',
    material: 'Prata 925 com banho ouro 18k', rating: 5.0, reviews: 47,
  },
  {
    name: 'Brinco Gota de Luz', category: 'brincos',
    price: 129.90, original_price: null,
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
    ],
    badge: null, is_new: false, is_bestseller: true,
    description: 'Brinco pendente em forma de gota com cristal austríaco, banhado a ouro 18k. Elegância fluida que complementa qualquer look.',
    material: 'Latão com banho ouro 18k e cristal', rating: 5.0, reviews: 62,
  },
  {
    name: 'Anel Solitário Eterno', category: 'aneis',
    price: 159.90, original_price: 199.90,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
    ],
    badge: 'sale', is_new: false, is_bestseller: true,
    description: 'Anel solitário clássico com zircônia lapidada, acabamento ouro 18k. Atemporal e sofisticado para qualquer ocasião.',
    material: 'Prata 925 com banho ouro 18k e zircônia', rating: 5.0, reviews: 38,
  },
  {
    name: 'Pulseira Elo Dourado', category: 'pulseiras',
    price: 219.90, original_price: null,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    ],
    badge: null, is_new: true, is_bestseller: false,
    description: 'Pulseira de elo oval banhada a ouro 18k, fecho tipo lagosta. Um clássico reinventado com acabamento premium.',
    material: 'Latão com banho ouro 18k', rating: 5.0, reviews: 29,
  },
  {
    name: 'Colar Constelação', category: 'colares',
    price: 249.90, original_price: 299.90,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    ],
    badge: 'sale', is_new: false, is_bestseller: false,
    description: 'Colar delicado com pingentes de estrelas em diferentes tamanhos, criando um efeito de constelação. Banhado a ouro 18k.',
    material: 'Prata 925 com banho ouro 18k', rating: 5.0, reviews: 21,
  },
  {
    name: 'Brinco Argola Slim', category: 'brincos',
    price: 99.90, original_price: null,
    image: 'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
    ],
    badge: null, is_new: true, is_bestseller: true,
    description: 'Argola minimalista com espessura fina e acabamento polido ouro 18k. Versátil, leve e contemporânea.',
    material: 'Latão com banho ouro 18k', rating: 4.9, reviews: 84,
  },
  {
    name: 'Anel Flor do Deserto', category: 'aneis',
    price: 179.90, original_price: null,
    image: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
    ],
    badge: 'new', is_new: true, is_bestseller: false,
    description: 'Anel com design floral delicado, pétalas trabalhadas à mão e pedras de zircônia. Feminilidade e exclusividade.',
    material: 'Prata 925 com banho ouro 18k e zircônia', rating: 5.0, reviews: 17,
  },
  {
    name: 'Pulseira Riviera Dourada', category: 'pulseiras',
    price: 289.90, original_price: 349.90,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
    ],
    badge: 'sale', is_new: false, is_bestseller: true,
    description: 'Pulseira riviera com 15 zircônias lapidadas em ouro 18k. Elegância que brilha em qualquer luz.',
    material: 'Prata 925, ouro 18k e zircônia cúbica', rating: 5.0, reviews: 43,
  },
  {
    name: 'Colar Chuva de Ouro', category: 'colares',
    price: 199.90, original_price: null,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
    ],
    badge: null, is_new: false, is_bestseller: false,
    description: 'Colar com multiplas correntes finas em diferentes comprimentos, criando efeito cascata dourado.',
    material: 'Latão com banho ouro 18k', rating: 4.8, reviews: 33,
  },
  {
    name: 'Brinco Petala de Rosa', category: 'brincos',
    price: 149.90, original_price: 179.90,
    image: 'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=600&q=80',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
    ],
    badge: null, is_new: true, is_bestseller: false,
    description: 'Brinco em formato de petala de rosa com acabamento acetinado, banhado a ouro rose 18k. Romanticismo refinado.',
    material: 'Latão com banho ouro rose 18k', rating: 5.0, reviews: 26,
  },
  {
    name: 'Anel Minimalista Band', category: 'aneis',
    price: 89.90, original_price: null,
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
    ],
    badge: null, is_new: false, is_bestseller: true,
    description: 'Anel band minimalista com superficie polida, empilhavel e atemporal. Perfeito para combinar com outras pecas.',
    material: 'Prata 925 com banho ouro 18k', rating: 4.9, reviews: 91,
  },
  {
    name: 'Pulseira Charm Inicial', category: 'pulseiras',
    price: 169.90, original_price: null,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    ],
    badge: 'new', is_new: true, is_bestseller: false,
    description: 'Pulseira delicada com pingente de letra inicial, personalizada para voce. Corrente fina em ouro 18k.',
    material: 'Prata 925 com banho ouro 18k', rating: 5.0, reviews: 52,
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log("Iniciando seed...");

    for (const product of products) {
      const { images, ...productData } = product;

      const res = await client.query(
        `INSERT INTO products (name, category, price, original_price, image, badge, is_new, is_bestseller, description, material, rating, reviews)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING id`,
        [
          productData.name, productData.category, productData.price,
          productData.original_price, productData.image, productData.badge,
          productData.is_new, productData.is_bestseller, productData.description,
          productData.material, productData.rating, productData.reviews
        ]
      );

      const productId = res.rows[0].id;

      for (let i = 0; i < images.length; i++) {
        await client.query(
          `INSERT INTO product_images (product_id, url, order_index) VALUES ($1, $2, $3)`,
          [productId, images[i], i]
        );
      }

      console.log(`Inserido: ${productData.name}`);
    }

    console.log("\nSeed concluido! Todos os produtos foram inseridos.");
  } catch (err) {
    console.error("Erro no seed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
