// ==============================
// SIDEBAR FUNCTION
// ==============================
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// buka sidebar
menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
});

// tutup sidebar (klik luar)
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// ==============================
// MENU CLICK (ROUTING DASAR)
// ==============================
const menuItems = document.querySelectorAll(".sidebar-menu li");

menuItems.forEach(item => {
  item.addEventListener("click", () => {

    const text = item.textContent.trim();

    switch (text) {

      case "🏠 Beranda":
        window.location.href = "index.html";
        break;

      case "💰 Daftar Harga":
        alert("Daftar harga (coming soon)");
        break;


      case "🔐 Masuk":
  window.location.href = "auth.html";
  break;

case "📝 Daftar":
  window.location.href = "auth.html";
  break;

    }

    // otomatis tutup sidebar setelah klik
    sidebar.classList.remove("active");
    overlay.classList.remove("active");

  });
});

// ==============================
// DEBUG (OPTIONAL)
// ==============================
console.log("✅ Sidebar ready");

// ==============================
// SEARCH TOGGLE
// ==============================
const searchBtn = document.querySelector(".icon-btn"); // tombol 🔍 pertama
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  searchBox.classList.toggle("active");
  searchInput.focus();
});


const slides = document.getElementById("slides");
const slideItems = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");

let index = 0;

// buat dots
slideItems.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    index = i;
    updateSlide();
  });

  dotsContainer.appendChild(dot);
});

function updateSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;

  document.querySelectorAll(".dots span").forEach(dot => dot.classList.remove("active"));
  dotsContainer.children[index].classList.add("active");
}

// auto slide
setInterval(() => {
  index = (index + 1) % slideItems.length;
  updateSlide();
}, 3000);



// ==============================
// CONFIG
// ==============================
const BIN_ID = "69fb9b0fadc21f119a62ac81";
const API_KEY = "$2a$10$b7426vCN3qvmHEGqIaeofuk0b.FXiKdEHj3Nh3zapOGnat.kn3TaW";

// ==============================
// FETCH GAME
// ==============================
async function loadGames() {
  try {
    const res = await fetch(
      `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
      {
        method: "GET",
        headers: {
          "X-Master-Key": API_KEY
        }
      }
    );

    if (!res.ok) {
      throw new Error("Gagal fetch data");
    }

    const data = await res.json();
    renderGames(data.record.games);

  } catch (err) {
    console.error(err);
    document.getElementById("gameList").innerHTML =
      "<p>Gagal load game 😢</p>";
  }
}


// ==============================
// RENDER GAME
// ==============================
function renderGames(games) {
  const container = document.getElementById("gameList");
  if (!container) return;

  container.innerHTML = "";

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    // Tambahkan klik redirect
    card.addEventListener("click", () => {
      window.location.href = `topup-${game.id}.html`;
    });

    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}"
           onerror="this.src='https://via.placeholder.com/300x150?text=Error'">
      <div class="game-info">
        <h3>${game.name}</h3>
        <p>${game.publisher}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

async function loadGames() {
  try {
    const res = await fetch(
      `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
      {
        method: "GET",
        headers: {
          "X-Master-Key": API_KEY
        }
      }
    );

    if (!res.ok) {
      throw new Error("Gagal fetch data");
    }

    const data = await res.json();
    console.log("Data fetch:", data); // 🔹 debug

    renderGames(data.record.games);

  } catch (err) {
    console.error(err);
    document.getElementById("gameList").innerHTML =
      "<p>Gagal load game 😢</p>";
  }
}

loadGames(); // 🔹 penting




// ==============================
// FORMAT K
// ==============================
function format(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "K+";
  }
  return num;
}

// ==============================
// DATA AWAL (PULUHAN RIBU)
// ==============================
let users = 34210;
let orders = 5120;
let active = 3;

// ==============================
// RENDER
// ==============================
function renderStats() {
  document.getElementById("totalUsers").textContent = format(users);
  document.getElementById("totalOrders").textContent = format(orders);
  document.getElementById("totalActive").textContent = active;
}

// ==============================
// UPDATE RANDOM
// ==============================
function updateStats() {
  users += Math.floor(Math.random() * 50) + 10;     // naik 10-60
  orders += Math.floor(Math.random() * 20) + 5;     // naik 5-25
  active = Math.floor(Math.random() * 10) + 300;      // 1-10 online

  renderStats();

  // interval 35 detik + random 0-10 detik
  const next = 35000 + Math.random() * 10000;

  setTimeout(updateStats, next);
}

// ==============================
// START
// ==============================
renderStats();
updateStats();

// ==============================
// DATA RANDOM
// ==============================
const names = ["Rizky", "Andi", "Budi", "Dimas", "Fajar", "Reza"];
const games = ["Mobile Legends", "Free Fire", "PUBG", "Valorant"];
const items = ["86 Diamonds", "172 Diamonds", "Weekly Pass", "140 UC"];

// ==============================
// BUAT TRANSAKSI
// ==============================
function createFeed() {
  const container = document.getElementById("feedContainer");

  const name = names[Math.floor(Math.random() * names.length)];
  const game = games[Math.floor(Math.random() * games.length)];
  const item = items[Math.floor(Math.random() * items.length)];

  const div = document.createElement("div");
  div.className = "feed-item";

  div.innerHTML = `<b>${name}</b> top up ${item} di ${game}`;

  container.prepend(div);

  // hapus kalau kebanyakan
  if (container.children.length > 5) {
    const last = container.lastChild;
    last.classList.add("fade-out");

    setTimeout(() => {
      last.remove();
    }, 500);
  }
}

// ==============================
// INTERVAL RANDOM
// ==============================
function startFeed() {
  createFeed();

  const next = 3000 + Math.random() * 4000; // 3-7 detik
  setTimeout(startFeed, next);
}

startFeed();

function format(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "K+";
  }
  return num;
}

document.getElementById("totalUsers").textContent = format(34000);
document.getElementById("totalOrders").textContent = format(5000);
document.getElementById("totalActive").textContent = 1;


// ==============================
// SEARCH GAME (FIX)
// ==============================
const searchInputBox = document.getElementById("searchInput");

searchInputBox.addEventListener("input", function () {
  const keyword = this.value.toLowerCase().trim();

  if (!window.allGames) return;

  const filtered = window.allGames.filter(game => {
    return (
      game.name.toLowerCase().includes(keyword) ||
      game.publisher.toLowerCase().includes(keyword)
    );
  });

  renderGames(filtered);
});