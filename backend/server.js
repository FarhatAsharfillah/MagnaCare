require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());

// Konfigurasi Database Cloud (Aiven)
// PASTIKAN GITHUB REPOSITORY-MU PRIVATE KARENA ADA PASSWORD DI SINI!
const dbConfig = {
  host: 'magnacarev1-db-farhatasharfillah03.c.aivencloud.com',
  port: 27253,
  user: 'avnadmin',
  password: process.env.DB_PASSWORD, 
  database: 'defaultdb',
  ssl: { rejectUnauthorized: false } // Wajib ditambahkan untuk koneksi cloud yang aman
};

async function testDbConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('✅ Berhasil terhubung ke database MySQL di Aiven Cloud!');
        await connection.end();
    } catch (error) {
        console.error('❌ Gagal terhubung ke database:', error.message);
    }
}
testDbConnection();

app.get('/', (req, res) => {
  res.send('Server Magna Care Backend Berjalan Lancar di Cloud!');
});

// -----------------------------------------------------------------
// 1. API Endpoint untuk Form Kontak (app.post)
// -----------------------------------------------------------------
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Semua kolom harus diisi!' });
  }

  try {
      const connection = await mysql.createConnection(dbConfig);
      const sqlQuery = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
      await connection.execute(sqlQuery, [name, email, message]);
      await connection.end();

      console.log(`📩 Pesan baru dari ${name} berhasil disimpan ke database!`);
      res.status(200).json({ success: true, message: 'Pesan berhasil diterima dan disimpan!' });
  } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Terjadi kesalahan pada server saat menyimpan data.' });
  }
});

// -----------------------------------------------------------------
// 2. API Endpoint untuk Daftar Produk (app.get)
// -----------------------------------------------------------------
app.get('/api/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM products');
        await connection.end();

        res.status(200).json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Gagal mengambil data produk dari server.' });
    }
});

// -----------------------------------------------------------------
// 3. API Endpoint untuk Proses Checkout (app.post)
// -----------------------------------------------------------------
app.post('/api/checkout', async (req, res) => {
    const { fullName, address, city, postalCode, paymentMethod, totalAmount, items } = req.body;
  
    try {
        const connection = await mysql.createConnection(dbConfig);
        
        const sqlQuery = 'INSERT INTO orders (full_name, address, city, postal_code, payment_method, total_amount, items) VALUES (?, ?, ?, ?, ?, ?, ?)';
        
        await connection.execute(sqlQuery, [
            fullName, 
            address, 
            city, 
            postalCode, 
            paymentMethod, 
            totalAmount, 
            JSON.stringify(items)
        ]);
        
        await connection.end();
  
        console.log(`📦 Pesanan baru sukses masuk dari ${fullName}! Total: Rp ${totalAmount}`);
        res.status(200).json({ success: true, message: 'Pesanan berhasil disimpan ke database!' });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Gagal memproses pesanan di server.' });
    }
});

// Render akan memberikan process.env.PORT, jika tidak ada (lokal), pakai 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Magna Care menyala di port ${PORT}`);
});