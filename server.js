const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); // html, css, js için

const ordersFilePath = path.join(__dirname, "data", "orders.json");
const usersFilePath = path.join(__dirname, "data", "users.json");

// Orders API
app.get("/orders", (req, res) => {
  fs.readFile(ordersFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Siparişler okunamadı." });
    res.json(JSON.parse(data || "[]"));
  });
});

app.post("/order", (req, res) => {
  const newOrder = req.body;
  fs.readFile(ordersFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Siparişler okunamadı." });
    const orders = JSON.parse(data || "[]");
    orders.push(newOrder);
    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Sipariş kaydedilemedi." });
      res.json({ message: "Sipariş başarıyla kaydedildi." });
    });
  });
});

// Users API
app.get("/users", (req, res) => {
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Kullanıcılar okunamadı." });
    res.json(JSON.parse(data || "[]"));
  });
});

app.post("/user", (req, res) => {
  const newUser = req.body;
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Kullanıcılar okunamadı." });
    const users = JSON.parse(data || "[]");
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Kullanıcı kaydedilemedi." });
      res.json({ message: "Kullanıcı başarıyla kaydedildi." });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
app.get("/test", (req, res) => {
  res.send("Server çalışıyor");
});
