const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

// Environment Variables
const PORT = process.env.PORT || 3000;
const API_SECRET = process.env.API_SECRET;

// Temporary order storage
const orders = [];

// Home
app.get("/", (req, res) => {
  res.json({
    store: "MGG STORE",
    status: "online"
  });
});

// Create Order
app.post("/api/orders", (req, res) => {
  const {
    game,
    playerId,
    package: packageName
  } = req.body;

  if (!game || !playerId || !packageName) {
    return res.status(400).json({
      success: false,
      message: "Missing order information"
    });
  }

  const order = {
    orderId:
      "MGG-" +
      crypto.randomBytes(4).toString("hex").toUpperCase(),

    game,
    playerId,
    package: packageName,
    status: "PENDING_PAYMENT",
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  res.json({
    success: true,
    order
  });
});

// Get Orders
app.get("/api/orders", (req, res) => {
  res.json({
    success: true,
    orders
  });
});

// Start Server
app.listen(PORT, () => {
  console.log("MGG STORE Backend is running");
});
