// Individu AZIZAH 1301220021
const redis = require('redis');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const admin = require('../models/admin');
const klien = require('../config/redis');

const kirimOTP = async (req, res) => {
    try {
        const {username, email} = req.body;

        if (!username || !email) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const otp = crypto.randomInt(100, 1000).toString();
        const expired = 180;

        await klien.setEx(username, expired, otp);

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'impalgentong@gmail.com',
                pass: 'impalgentong',
            },
        });

        const mail = {
            from: 'impalgentong@gmail.com',
            to: email,
            subject: 'Kode OTP Stocku Verifikasi',
            text: 'Kode OTP : ${otp}. Perhatian! Kode berlaku hanya 3 menit',
        };

        await transport.sendMail(mail);
        res.status(200).json({ message: 'OTP telah dikirim ke email Anda' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const verifikasiOTP = async (req, res) => {
    try {
        const {username, email} = req.body;

        const otpDataBase = await klien.get(username);
        if (!otpDataBase) {
            return res.status(404).json({ message: 'Masukkan OTP!' });
        }

        if (otp!==otpDataBase) {
            return res.status(400).json({ message: 'Mohon maaf OTP salah!' });
        }

        await client.del(username);

        res.status(200).json({ message: 'OTP sudah benar!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports={kirimOTP, verifikasiOTP};
