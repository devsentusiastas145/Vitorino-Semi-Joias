const express = require("express");
const mercadopago = require("mercadopago");

const app = express();
app.use(express.json());

mercadopago.configure({
  access_token: "SEU_ACCESS_TOKEN"
});

app.post("/process-payment", async (req, res) => {
  try {
    const payment = await mercadopago.payment.create({
      transaction_amount: req.body.transaction_amount,
      token: req.body.token,
      description: req.body.description,
      installments: req.body.installments,
      payment_method_id: req.body.payment_method_id,
      payer: req.body.payer
    });

    res.json({
      status: payment.body.status
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando"));
const mp = new MercadoPago('SUA_PUBLIC_KEY');

const cardForm = mp.cardForm({
  amount: "50.00",
  form: {
    id: "payment-form",
    cardholderName: { id: "cardholderName" },
    cardNumber: { id: "cardNumber" },
    expirationDate: { id: "expirationDate" },
    securityCode: { id: "securityCode" },
    identificationNumber: { id: "cpf" }
  },
  callbacks: {
    onSubmit: async (event) => {
      event.preventDefault();

      const data = cardForm.getCardFormData();

      const response = await fetch("/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: data.token,
          payment_method_id: data.paymentMethodId,
          issuer_id: data.issuerId,
          transaction_amount: Number(data.amount),
          installments: Number(data.installments),
          description: "Produto",
          payer: {
            email: "Email",
            identification: {
              type: "CPF",
              number: data.identificationNumber
            }
          }
        })
      });

      const result = await response.json();

      alert("Status: " + result.status);
    }
  }
});