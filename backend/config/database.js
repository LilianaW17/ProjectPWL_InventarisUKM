const mysql = require('mysql2');
const dotenv = require('dotenv');

// Baca file .env
dotenv.config();

// Buat koneksi pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cek koneksi
db.getConnection((err, connection) => {
    if (err) {
        console.error('Gagal connect ke Database:', err.message);
    } else {
        console.log('Berhasil connect ke Database Inventaris UKM');
        connection.release();
    }
});

module.exports = db.promise();