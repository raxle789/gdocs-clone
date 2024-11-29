require("dotenv").config();
const express = require("express");
const next = require("next");
const path = require("path");

// Tentukan mode pengembangan atau produksi
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: path.join(__dirname, "client") }); // Arahkan Next.js ke folder 'client'
const handle = app.getRequestHandler();

// Inisialisasi aplikasi Express
const server = express();

// Middleware untuk JSON parsing
server.use(express.json());

// Tambahkan route untuk API dari folder 'server'
const apiRoutes = require("./server/server"); // Pastikan API dikelola di folder server/routes
server.use("/api", apiRoutes);

// Tangani semua request Next.js
server.all("*", (req, res) => {
  return handle(req, res);
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.prepare().then(() => {
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Application ready on http://localhost:${PORT}`);
  });
});
