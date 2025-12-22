const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { username, password, full_name, role } = req.body;

        // Validasi sederhana
        if (!username || !password || !full_name) {
            return res.status(400).json({ message: "Username, password, dan nama wajib diisi!" });
        }

        // cek apakah username sudah dipakai?
        const existingUser = await UserModel.findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: "Username sudah terdaftar!" });
        }

        // enkripsi Password (Hashing)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // simpan ke Database
        // jika role tidak diisi, otomatis jadi 'anggota' (sesuai default database)
        await UserModel.createUser(username, hashedPassword, full_name, role || 'anggota');

        res.status(201).json({ 
            message: "Registrasi berhasil! Silahkan login." 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findUserByUsername(username);
        // kalau user tidak ditemukan
        if (!user) {
            return res.status(404).json({ message: "Username tidak ditemukan!" });
        }

        // cek password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // Kalau password salah
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password salah!" });
        }

        // buat Token JWT
        const token = jwt.sign(
            { 
                id: user.id, 
                role: user.role, 
                name: user.full_name 
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Token berlaku 24 jam
        );

        // kirim Token & Data User ke Client
        res.json({
            message: "Login berhasil!",
            token: token,
            user: {
                id: user.id,
                name: user.full_name,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};

module.exports = { register, login };