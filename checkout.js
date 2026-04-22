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

      const response = await fetch("/criar-pagamento", {
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
          payer: {
            email: "teste@email.com",
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