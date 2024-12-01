const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');

const signUp = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // Cek apakah sudah terisi semua di form
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        // Cek apakah username unik
        const exist = await admin.findUser(username);
        if (exist.length>0) {
            return res.status(400).json({ message: "Username sudah digunakan" });
        }

        // Cek apakah format gmail sudah benar
        if (("@" + email.split("@")[1])!="@gmail.com" || !email.includes("@")) {
            return res.status(400).json({ message: "Format email tidak valid" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        
        admin.create(username, email, hashedPass);
        res.status(201).json({message: 'Selamat Anda berhasil Masuk'});
    } catch (err) {
        res.status(500).json({error: err.message});
    };
}

const signIn = async (req, res) => {
    try {
        const {username, password} = req.body;
        // Cek apakah sudah terisi semua di form
        if (!username ||  !password) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }
        
        const findUsername = await admin.findUser(username);

        // Cek apakah ketemu usernamenya
        if (findUsername.length===0) {
            return res.status(401).json({ message: 'Username Anda salah Silahkan coba lagi' });
        }

        // Validasi Password
        const user = findUsername[0];
        const passSama = await bcrypt.compare(password, user.pass);

        // Jika pass tidak sama
        if (!passSama) {
            return res.status(401).json({ message: 'Password Anda salah Silahkan coba lagi' });
        }

        // Membuat token
        const token = jwt.sign({ username: user.username, pass: user.pass }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
} 

const editEmail = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const {username} = decoded;
        const {email} = req.body;

        // Cek apakah sudah di isi smeua formnya
        if (!email) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const edited = admin.editEmail(username, email);

        // Kalau gagal teredit
        if (!edited) {
            return res.status(500).json({ message: "Gagal mengubah email" });
        }

        res.status(201).json({message: 'Selamat Anda berhasil mengubah email'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports= {signUp, signIn, editEmail};