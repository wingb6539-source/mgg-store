/*
MGG STORE ADMIN PANEL V2026

Demo login:
Username: admin
Password: mgg2026
*/

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "mgg2026";

let orders = JSON.parse(localStorage.getItem("mggOrders") || "[]");

function login() {
const username = document.getElementById("adminUser").value.trim();
const password = document.getElementById("adminPass").value;

if (
username === ADMIN_USERNAME &&
password === ADMIN_PASSWORD
) {
sessionStorage.setItem("mggAdmin", "true");

document.getElementById("loginPage").classList.add("hidden");
document.getElementById("adminPanel").classList.remove("hidden");

renderOrders();

} else {
document.getElementById("loginMessage").textContent =
"❌ Username ឬ Password មិនត្រឹមត្រូវ";
}
}

function logout() {
sessionStorage.removeItem("mggAdmin");

document.getElementById("adminPanel").classList.add("hidden");
document.getElementById("loginPage").classList.remove("hidden");
}

function updateStats() {
const total = orders.length;

const pending = orders.filter(
order => order.status === "PENDING_PAYMENT"
).length;

const completed = orders.filter(
order => order.status === "COMPLETED"
).length;

document.getElementById("totalOrders").textContent = total;
document.getElementById("pendingOrders").textContent = pending;
document.getElementById("completedOrders").textContent = completed;
}

function renderOrders() {
updateStats();

const list = document.getElementById("ordersList");
const search = document
.getElementById("searchOrder")
.value
.toLowerCase();

const filtered = orders.filter(order => {
return (
String(order.orderId || "").toLowerCase().includes(search) ||
String(order.playerId || "").toLowerCase().includes(search)
);
});

if (filtered.length === 0) {
list.innerHTML = "<div class="empty"> 📦 No orders found </div>";
return;
}

list.innerHTML = filtered.map((order, index) => `
<div class="order">

  <div class="order-top">
    <h3>${escapeHTML(order.orderId || "Unknown")}</h3>

    <span class="status">
      ${escapeHTML(order.status || "PENDING_PAYMENT")}
    </span>
  </div>

  <div class="order-info">
    🎮 Game: ${escapeHTML(order.game || "-")}<br>
    👤 Player ID: ${escapeHTML(order.playerId || "-")}<br>
    💎 Package: ${escapeHTML(order.package || "-")}<br>
    🕒 Date: ${escapeHTML(order.createdAt || "-")}
  </div>

  <div class="order-actions">
    <button class="complete"
      onclick="changeStatus(${index}, 'COMPLETED')">
      ✅ Complete
    </button>

    <button
      onclick="changeStatus(${index}, 'PAID')">
      💰 Paid
    </button>

    <button
      onclick="changeStatus(${index}, 'PENDING_PAYMENT')">
      ⏳ Pending
    </button>

    <button class="cancel"
      onclick="changeStatus(${index}, 'CANCELLED')">
      ❌ Cancel
    </button>
  </div>

</div>

`).join("");
}

function changeStatus(index, status) {
const order = orders[index];

if (!order) return;

order.status = status;

localStorage.setItem(
"mggOrders",
JSON.stringify(orders)
);

renderOrders();
}

function escapeHTML(value) {
return String(value)
.replaceAll("&", "&")
.replaceAll("<", "<")
.replaceAll(">", ">")
.replaceAll('"', """)
.replaceAll("'", "'");
}

/* Auto login if already logged in */

if (sessionStorage.getItem("mggAdmin") === "true") {
document.getElementById("loginPage").classList.add("hidden");
document.getElementById("adminPanel").classList.remove("hidden");
renderOrders();
  }
