// Import modul yang dibutuhkan
const bcrypt = require('bcryptjs'); // Untuk hashing password
const jwt = require('jsonwebtoken'); // Untuk membuat dan memverifikasi token JWT
const admin = require('../models/admin'); // Model admin untuk berinteraksi dengan database

/**
 * Fungsi untuk registrasi pengguna baru.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan respons ke client.
 */
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validasi apakah semua field telah diisi
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        // Cek apakah username sudah digunakan
        const exist = await admin.findUser(username);
        if (exist.length > 0) {
            return res.status(400).json({ message: "Username sudah digunakan" });
        }

        // Validasi format email (harus berakhiran @gmail.com)
        if (("@" + email.split("@")[1]) != "@gmail.com" || !email.includes("@")) {
            return res.status(400).json({ message: "Format email tidak valid" });
        }

        // Hash password untuk keamanan
        const hashedPass = await bcrypt.hash(password, 10);
        
        // Simpan data pengguna baru ke database
        admin.create(username, email, hashedPass);
        res.status(201).json({ message: 'Selamat Anda berhasil Masuk' });
    } catch (err) {
        // Tangani error internal server
        res.status(500).json({ error: err.message });
    };
}

/**
 * Fungsi untuk login pengguna.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan respons ke client.
 */
const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi apakah semua field telah diisi
        if (!username || !password) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }
        
        // Cari username di database
        const findUsername = await admin.findUser(username);

        // Jika username tidak ditemukan
        if (findUsername.length === 0) {
            return res.status(401).json({ message: 'Username Anda salah Silahkan coba lagi' });
        }

        // Validasi password dengan bcrypt
        const user = findUsername[0];
        const passSama = await bcrypt.compare(password, user.pass);

        // Jika password tidak cocok
        if (!passSama) {
            return res.status(401).json({ message: 'Password Anda salah Silahkan coba lagi' });
        }

        // Buat token JWT untuk autentikasi
        const token = jwt.sign({ username: user.username, pass: user.pass }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        // Tangani error internal server
        res.status(500).json({ error: err.message });
    }
}

/**
 * Fungsi untuk mengubah email pengguna.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan respons ke client.
 */
const editEmail = async (req, res) => {
    try {
        const { email } = req.body;

        // Validasi apakah email diisi
        if (!email) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        // Perbarui email di database
        const edited = admin.editEmail(req.query.username, email);

        // Jika gagal memperbarui email
        if (!edited) {
            return res.status(500).json({ message: "Gagal mengubah email" });
        }

        res.status(201).json({ message: 'Selamat Anda berhasil mengubah email' });
    } catch (err) {
        // Tangani error internal server
        res.status(500).json({ error: err.message });
    }
}

/**
 * Fungsi untuk mendapatkan email pengguna.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan respons ke client.
 */
const getEmails = async (req, res) => {
    try {
        // Ambil email dari database
        const email_getted = await admin.getEmail(req.query.username);

        // Jika email tidak ditemukan
        if (email_getted.length === 0) {
            return res.status(500).json({ message: "Gagal mengambil email" });
        }

        res.status(201).json({ message: 'Email fetched', email: email_getted });
    } catch (err) {
        // Tangani error internal server
        res.status(500).json({ error: err.message });
    }
}

// Ekspor fungsi-fungsi untuk digunakan di router atau modul lainnya
module.exports = { signUp, signIn, editEmail, getEmails };
