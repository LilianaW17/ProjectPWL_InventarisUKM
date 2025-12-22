const db = require('../config/database');

// untuk mencari user berdasarkan username (buat cek duplikat & login)
const findUserByUsername = async (username) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0]; // Kembalikan user pertama yang ditemukan (atau undefined)
};

// untuk tambah user baru (Register)
const createUser = async (username, password, fullName, role) => {
    const query = `
        INSERT INTO users (username, password, full_name, role) 
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [username, password, fullName, role]);
    return result.insertId;
};

module.exports = {
    findUserByUsername,
    createUser
};