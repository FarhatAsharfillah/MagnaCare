const mysql = require('mysql2/promise');

async function checkCloudDB() {
  const dbConfig = {
    host: 'magnacarev1-db-farhatasharfillah03.c.aivencloud.com',
    port: 27253,
    user: 'avnadmin',
    password: 'RAHASIA_DIPINDAH_KE_ENV', // <-- MASUKKAN PASSWORD ASLIMU LAGI
    database: 'defaultdb',
    ssl: { rejectUnauthorized: false }
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("✅ Terhubung ke Aiven Cloud!\n");

    // 1. Cek Daftar Tabel
    console.log("📋 DAFTAR TABEL YANG TERSEDIA:");
    const [tables] = await connection.execute("SHOW TABLES");
    console.table(tables);

    // 2. Cek Isi Tabel Products
    console.log("\n📦 ISI TABEL PRODUCTS (Katalog Magna Care):");
    const [products] = await connection.execute("SELECT id, name, price FROM products");
    console.table(products); // console.table akan membuat outputnya rapi seperti di Excel!

    await connection.end();
  } catch (error) {
    console.error("❌ Gagal mengecek data:", error);
  }
}

checkCloudDB();