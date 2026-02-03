const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const detailsDiv = document.getElementById("product-details");
const emailInput = document.getElementById("buyer-email");

// Load product
db.ref("products/" + productId).once("value").then(snapshot => {
  const p = snapshot.val();
  detailsDiv.innerHTML = `
    <h1>${p.name}</h1>
    <img src="${p.image}" width="300">
    <p>${p.description}</p>
    <p>Price: $${p.price}</p>
  `;

  // Render PayPal button
  paypal.Buttons({
    createOrder: (data, actions) => {
      const buyerEmail = emailInput.value;
      if (!buyerEmail) { alert("Enter email for delivery"); return; }

      return actions.order.create({
        purchase_units: [{
          amount: { value: p.price },
          description: p.name
        }]
      });
    },
    onApprove: async (data, actions) => {
      const order = await actions.order.capture();
      const buyerEmail = emailInput.value;

      // Save purchase to Firebase
      const purchaseId = db.ref("purchases").push().key;
      db.ref("purchases/" + purchaseId).set({
        productId,
        email: buyerEmail,
        status: "pending",
        paymentId: order.id,
        date: new Date().toISOString()
      });

      alert("Payment successful! Admin will send your EA in 2-5 business days.");
    }
  }).render('#paypal-button-container');
});