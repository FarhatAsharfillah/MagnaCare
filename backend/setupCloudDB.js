const mysql = require('mysql2/promise');

async function setupCloudDB() {
  // Masukkan kunci rumah barumu di sini
  const dbConfig = {
    host: 'magnacarev1-db-farhatasharfillah03.c.aivencloud.com',
    port: 27253,
    user: 'avnadmin',
    password: 'RAHASIA_DIPINDAH_KE_ENV', // <-- GANTI DENGAN PASSWORD ASLIMU
    database: 'defaultdb',
    ssl: { rejectUnauthorized: false } // Wajib ditambahkan agar Aiven mengizinkan koneksi
  };

  try {
    console.log("⏳ Menghubungkan ke Aiven Cloud Database...");
    const connection = await mysql.createConnection(dbConfig);
    console.log("✅ Berhasil terhubung ke Cloud!");

    // 1. Membuat Tabel Orders
    console.log("⏳ Membuat tabel orders...");
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
          id INT AUTO_INCREMENT PRIMARY KEY,
          full_name VARCHAR(100) NOT NULL,
          address TEXT NOT NULL,
          city VARCHAR(100) NOT NULL,
          postal_code VARCHAR(20) NOT NULL,
          payment_method VARCHAR(50) NOT NULL,
          total_amount INT NOT NULL,
          items JSON NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Membuat Tabel Contacts
    console.log("⏳ Membuat tabel contacts...");
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Membuat Tabel Products
    console.log("⏳ Membuat tabel products...");
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          price VARCHAR(50),
          image_url VARCHAR(255)
      )
    `);

    // 4. Memasukkan Data 9 Produk
    console.log("⏳ Memasukkan 9 data produk Magna Care...");
    await connection.execute(`TRUNCATE TABLE products`); // Bersihkan tabel jaga-jaga kalau sudah ada isinya
    await connection.execute(`
      INSERT INTO products (name, description, price, image_url) VALUES
('Daily Purifying Cleanser', 'Deep pore cleansing without drying. Removes dirt and excess oil without leaving your skin feeling tight.', 'Rp 120.000', '/images/Daily_Purifying.png'),
('Hydrating Defense Moisturizer', 'Strengthens the skin barrier and brightens. Locks in moisture all day with an ultra-lightweight, fast-absorbing formula.', 'Rp 150.000', '/images/Hydrating_Defense.png'),
('UV Shield Matte Sunscreen SPF 50', 'Maximum UVA/UVB protection. Daily sun defense with a natural, shine-free matte finish.', 'Rp 180.000', '/images/UV_shield.png'),
('Revitalizing Vitamin C Serum', 'Brightens dullness and fades dark spots. A highly concentrated serum for a fresher, more radiant complexion.', 'Rp 220.000', '/images/Revitalizing.png'),
('Acne Combat Spot Gel', 'Fast-acting treatment for active acne. Quickly tackles breakouts and reduces redness in no time.', 'Rp 135.000', '/images/Acne_Combat.png'),
('Pore Refining Exfoliating Toner', 'Gentle exfoliation for cleaner pores. Gently sweeps away dead skin cells for a smoother texture and minimized pores.', 'Rp 145.000', '/images/Pore_Refining.png'),
('Invigorating Scalp & Hair Shampoo', 'Deeply cleanses the scalp and reduces hair fall. Washes away impurities while adding natural volume.', 'Rp 160.000', '/images/Invigorating_Scalp.png'),
('Deep Sea Minerals Body Wash', 'Detoxifying and moisturizing body cleanse. Infused with sea minerals to wash away daily pollution while keeping your skin hydrated.', 'Rp 140.000', '/images/Deep_Sea.png'),
('Nourishing Beard & Aftershave Oil', 'Softens the beard and soothes shaving irritation. Nourishes facial hair while calming the skin after a close shave.', 'Rp 175.000', '/images/Nourishing.png')`);

    console.log("🎉 SEMUA SETUP DATABASE DI CLOUD SELESAI!");
    await connection.end();
  } catch (error) {
    console.error("❌ Terjadi Kesalahan:", error);
  }
}

setupCloudDB();