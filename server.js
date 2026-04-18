import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Substitua pelo seu Access Token do MercadoPago
mercadopago.configure({
  access_token: "SEU_ACCESS_TOKEN_AQUI"
});

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

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

app.listen(3000, () => {
  console.log("Backend rodando em http://localhost:3000");
});
