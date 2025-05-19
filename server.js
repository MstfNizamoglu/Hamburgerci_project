const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // HTML, CSS, JS dosyaları

// Dosya yolları
const dataDir = path.join(__dirname, "data");
const ordersFilePath = path.join(dataDir, "orders.json");
const usersFilePath = path.join(dataDir, "users.json");

// Ana sayfa (login formu)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Kullanıcı girişi
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ success: false, message: "Kullanıcılar okunamadı." });

    const users = JSON.parse(data || "[]");
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      res.json({ success: true, redirect: "/burger.html" });
    } else {
      res.json({ success: false, message: "Kullanıcı adı veya şifre yanlış!" });
    }
  });
});

// Kullanıcı kaydı
app.post("/user", (req, res) => {
  const newUser = req.body;

  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Kullanıcılar okunamadı." });

    const users = JSON.parse(data || "[]");
    const userExists = users.some(u => u.username === newUser.username);

    if (userExists) {
      return res.status(400).json({ error: "Bu kullanıcı adı zaten var." });
    }

    users.push(newUser);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Kullanıcı kaydedilemedi." });
      res.json({ message: "Kayıt başarılı." });
    });
  });
});

// Burger menüsü
app.get("/burger.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "burger.html"));
});

// Sipariş gönderme
app.post("/order", (req, res) => {
  const newOrder = req.body;

  fs.readFile(ordersFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Siparişler okunamadı." });

    const orders = JSON.parse(data || "[]");
    orders.push(newOrder);

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Sipariş kaydedilemedi." });
      res.json({ message: `Siparişiniz alındı: ${newOrder.name}` });
    });
  });
});

// Siparişleri gör
app.get("/orders", (req, res) => {
  fs.readFile(ordersFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Siparişler okunamadı." });
    res.json(JSON.parse(data || "[]"));
  });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.send("Server çalışıyor.");
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} adresinde çalışıyor.`);
});
