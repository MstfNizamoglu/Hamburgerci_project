# Hamburgerci Musty 🍔

Bu proje, basit bir hamburger sipariş ve kullanıcı kayıt sistemi içerir.

## Özellikler

- Node.js + Express sunucusu
- HTML/CSS/JS frontend
- Hamburgerleri listeleme (`/burgers` endpointi üzerinden)
- Sepete ürün ekleme
- Kayıt formu ile kullanıcı kaydetme (POST metodu, `users.json` dosyasına kayıt)
- `fetch()` API kullanımı
- Cookie & Session entegrasyonu (bonus)

## Kurulum

```bash
npm install
node server.js
```

Tarayıcıda aç: `http://localhost:3000`

## Klasör Yapısı

```
hamburgerci/
├── public/
│   ├── index.html
│   ├── cheeseburger.jpeg
│   ├── Edamame-Mushroom-Veggie-Burgers-9.jpg
│   └──  Southern-Fried-Chicken-Burger-1.webp
├── data/
│   ├── users.json
│   └── order.json
├── server.js
├── README.md
```

## Notlar

- Kayıtlar `data/users.json` dosyasına eklenir.
- Tarayıcı konsolunda sepete eklenen ürünleri ve toplam tutarı görebilirsiniz.

---

**Hazırlayan:** [Mustafa Nizamoğlu 210504010]
