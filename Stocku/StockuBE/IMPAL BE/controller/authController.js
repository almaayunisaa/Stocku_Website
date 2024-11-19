const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');

const signUp = (req, res) => {
    try {
        const {username, email, password} = req.body;
        const hashedPass = bcrypt.hash(password, 10);

        admin.create(username, email, hashedPass);
        res.status(201).json({message: 'Selamat Anda berhasil Masuk'});
    } catch (err) {
        res.status(500).json({error: err.message});
    };
}

const signIn = (req, res) => {
    try {
        const {username, password} = req.body;
        const findUsername = admin.findUser(username);

        if (findUsername.length===0) {
            return res.status(401).json({ message: 'Username Anda salah Silahkan coba lagi' });
        }

        const user = findUsername[0];
        const passSama = bcrypt.compare(password, user.password);

        if (!passSama) {
            return res.status(401).json({ message: 'Password Anda salah Silahkan coba lagi' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
} 

const editEmail = (req, res) => {
    try {
        const {username} = req.body;
        const {email} = req.query;
        const user = admin.editEmail(username, email);

        if (user.length===0) {
            return res.status(404).json({message : 'email tidak valid'});
        }

        res.status(201).json({message: 'Selamat Anda berhasil mengubah email'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports= {signUp, signIn, editEmail};