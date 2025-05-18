const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyalar için klasör ayarı
app.use(express.static(path.join(__dirname, "public")));

// Basit login sayfası (index.html), public klasöründe olmalı
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Login kontrolü
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "musty" && password === "1234") {
    // Başarılıysa hamburger menüsüne yönlendir
    res.json({ success: true, redirect: "/burger.html" });
  } else {
    res.json({ success: false, message: "Kullanıcı adı veya şifre yanlış!" });
  }
});

// Burger menüsünü sunar (burger.html public klasöründe)
app.get("/burger.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "burger.html"));
});

// Sipariş alma endpoint'i
app.post("/order", (req, res) => {
  const order = req.body;
  const filePath = path.join(__dirname, "orders.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    let orders = [];

    if (!err && data) {
      try {
        orders = JSON.parse(data);
      } catch (parseErr) {
        console.error("JSON parse hatası:", parseErr);
      }
    }

    orders.push(order);

    fs.writeFile(filePath, JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        console.error("Yazma hatası:", err);
        return res.status(500).json({ message: "Sipariş kaydedilemedi!" });
      }

      res.json({ message: `Siparişiniz alındı: ${order.name}` });
    });
  });
});

// Server'ı başlat
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} adresinde çalışıyor.`);
});
