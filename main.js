// Open Login Modal
function openLoginModal() {
  new bootstrap.Modal(document.getElementById("loginModal")).show();
}

// Toast Notification
function showToast(message, type="success") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: type === "success" ? "#28a745" : "#dc3545",
    stopOnFocus: true,
  }).showToast();
}

// Firebase Authentication
function loginBtn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => showToast("Logged in successfully"))
    .catch(err => showToast(err.message, "error"));
}

function registerBtn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => showToast("Registered successfully"))
    .catch(err => showToast(err.message, "error"));
}

// Load Products
const dbRef = firebase.database().ref("products");
const robotList = document.getElementById("robot-list");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("search-input");

function renderProducts(snapshot) {
  loading.style.display = "none";
  const products = snapshot.val() || {};
  robotList.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase();

  for (let id in products) {
    const p = products[id];
    if (!p.name.toLowerCase().includes(searchTerm) && !p.description.toLowerCase().includes(searchTerm)) continue;

    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm animate__animated animate__fadeInUp">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text text-truncate">${p.description}</p>
          <div class="mt-auto">
            <p class="fw-bold text-primary">$${p.price}</p>
            <a href="product.html?id=${id}" class="btn btn-primary w-100">View More</a>
          </div>
        </div>
      </div>
    `;
    robotList.appendChild(col);
  }
}

dbRef.on("value", renderProducts);
searchInput.addEventListener("input", () => dbRef.once("value", renderProducts));
db.ref("products").on("value", snapshot => {
  loading.style.display = "none";
  const products = snapshot.val() || {};
  const row = document.getElementById("robot-list");
  row.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase();
  for (let id in products) {
    const p = products[id];
    if (!p.name.toLowerCase().includes(searchTerm) && !p.description.toLowerCase().includes(searchTerm)) {
      continue;
    }
    // then build card as above...
     const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text text-truncate">${p.description}</p>
          <div class="mt-auto">
            <p class="fw-bold">$${p.price}</p>
            <a href="product.html?id=${id}" class="btn btn-primary w-100">View More</a>
          </div>
        </div>
      </div>
    `;
    row.appendChild(col);
    
  }
});

searchInput.addEventListener("input", () => {
  db.ref("products").once("value", snapshot => {
    // reuse code above to refresh list based on new searchInput.value
  });
});
