// ================= CONFIG =================
const CONFIG = {
  BIN_ID: "69fba3dbc0954111d8e83949",
  API_KEY: "$2a$10$b7426vCN3qvmHEGqIaeofuk0b.FXiKdEHj3Nh3zapOGnat.kn3TaW"
};

// ================= STATE =================
let selectedProduct = null;
let selectedPayment = null;

// ================= FETCH DATA =================
async function fetchData() {
  try {
    const res = await fetch(
      `https://api.jsonbin.io/v3/b/${CONFIG.BIN_ID}/latest`,
      {
        headers: {
          "X-Master-Key": CONFIG.API_KEY
        }
      }
    );

    const result = await res.json();
    return result.record;

  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

// ================= LOAD DATA =================
async function loadData() {
  const data = await fetchData();
  if (!data) return;

  loadProducts(data.products);
  loadPayments(data.payments);
}

// ================= PRODUK =================
function loadProducts(products) {
  const container = document.getElementById("nominalList");
  container.innerHTML = "";

  products.forEach(p => {
    if (!p.active) return;

    const div = document.createElement("div");
    div.className = "product-item";

    div.innerHTML = `
      <b>${p.name}</b><br>
      Rp ${Number(p.price).toLocaleString("id-ID")}
    `;

    div.onclick = () => {
      document.querySelectorAll(".product-item")
        .forEach(el => el.classList.remove("active"));

      div.classList.add("active");
      selectedProduct = p;
    };

    container.appendChild(div);
  });
}

// ================= PAYMENT =================
function loadPayments(payments) {
  const container = document.getElementById("paymentMethods");
  container.innerHTML = "";

  payments.forEach(p => {
    if (!p.active) return;

    const div = document.createElement("div");
    div.className = "payment-item";

    div.innerHTML = `
      <b>${p.name}</b><br>
      <small>${p.type.toUpperCase()}</small>
    `;

    div.onclick = () => {
      document.querySelectorAll(".payment-item")
        .forEach(el => el.classList.remove("active"));

      div.classList.add("active");
      selectedPayment = p;
    };

    container.appendChild(div);
  });
}

// ================= STEP 1 → 2 =================
function checkout() {
  const userId = document.getElementById("userId").value.trim();

  if (!userId) return alert("Masukkan ID Game");
  if (!selectedProduct) return alert("Pilih nominal dulu");

  // kirim data via URL
  const url = `pembayaranff.html?id=${userId}&produk=${encodeURIComponent(selectedProduct.name)}&harga=${selectedProduct.price}`;

  window.location.href = url;
}

// ================= FINAL =================
function finalCheckout() {
  const userId = document.getElementById("userId").value.trim();

  if (!selectedPayment) return alert("Pilih metode pembayaran");

  const resultStep = document.getElementById("resultStep");
  const info = document.getElementById("paymentInfo");

  let html = `
    <div class="payment-box">
      <h4>Detail Pesanan</h4>
      <p><b>ID:</b> ${userId}</p>
      <p><b>Produk:</b> ${selectedProduct.name}</p>
      <p><b>Total:</b> Rp ${Number(selectedProduct.price).toLocaleString("id-ID")}</p>
      <hr>
  `;

  // BANK
  if (selectedPayment.type === "bank") {
    html += `
      <p><b>Transfer ke ${selectedPayment.name}</b></p>
      <p>${selectedPayment.number}</p>
      <p>a.n ${selectedPayment.owner}</p>
    `;
  }

  // QR
  if (selectedPayment.type === "qr") {
    html += `
      <p><b>Scan QRIS</b></p>
      <img src="${selectedPayment.image}" width="200">
    `;
  }

  html += `
      <br><br>
      <button class="btn-main" onclick="sendWhatsApp()">
        Konfirmasi via WhatsApp
      </button>
    </div>
  `;

  info.innerHTML = html;
  resultStep.style.display = "block";

  resultStep.scrollIntoView({ behavior: "smooth" });
}

// ================= WHATSAPP =================
function sendWhatsApp() {
  const userId = document.getElementById("userId").value.trim();

  const phone = "628xxxxxxxxxx"; // GANTI NOMOR LU

  let message = `*ORDER TOP UP FREE FIRE*%0A`;
  message += `ID: ${userId}%0A`;
  message += `Produk: ${selectedProduct.name}%0A`;
  message += `Total: Rp ${Number(selectedProduct.price).toLocaleString("id-ID")}%0A`;
  message += `Pembayaran: ${selectedPayment.name}%0A`;

  if (selectedPayment.type === "bank") {
    message += `Transfer ke: ${selectedPayment.name}%0A`;
    message += `No: ${selectedPayment.number}%0A`;
  }

  if (selectedPayment.type === "qr") {
    message += `Metode: QRIS%0A`;
  }

  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, "_blank");
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", loadData);