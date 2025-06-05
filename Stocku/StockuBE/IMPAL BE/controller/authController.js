const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');

const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const exist = await admin.findUser(username);
        if (exist.length > 0) {
            return res.status(400).json({ message: "Username sudah digunakan" });
        }

        if (("@" + email.split("@")[1]) != "@gmail.com" || !email.includes("@")) {
            return res.status(400).json({ message: "Format email tidak valid" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        await admin.create(username, email, hashedPass);

        res.status(201).json({ message: 'Selamat Anda berhasil Masuk' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const findUsername = await admin.findUser(username);

        if (findUsername.length === 0) {
            return res.status(401).json({ message: 'Username Anda salah Silahkan coba lagi' });
        }

        const user = findUsername[0];
        const passSama = await bcrypt.compare(password, user.pass);

        if (!passSama) {
            return res.status(401).json({ message: 'Password Anda salah Silahkan coba lagi' });
        }

        const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const edited = await admin.editEmail(req.query.username, email);

        if (!edited || edited === 0) {
            return res.status(500).json({ message: "Gagal mengubah email" });
        }

        res.status(200).json({ message: 'Selamat Anda berhasil mengubah email' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getEmails = async (req, res) => {
    try {
        const email_getted = await admin.getEmail(req.query.username);

        if (email_getted.length === 0) {
            return res.status(500).json({ message: "Gagal mengambil email" });
        }

        res.status(200).json({
            message: 'Email fetched',
            email: email_getted[0]?.email
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { signUp, signIn, editEmail, getEmails };
