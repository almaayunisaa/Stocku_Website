/**
 * Router untuk autentikasi dan pengelolaan akun.
 *
 * Berisi endpoint untuk pendaftaran, masuk, pengeditan email, dan pengambilan email akun.
 * Menggunakan controller `authController`.
 *
 * @module routes/authRoutes
 */

const express = require('express');
const { signUp, signIn, editEmail, getEmails } = require('../controller/authController');

const router = express.Router();

/**
 * Endpoint untuk login pengguna.
 * 
 * @route POST /signIn
 * @access Public
 * @body {string} username - Nama pengguna.
 * @body {string} password - Kata sandi pengguna.
 * @returns {object} Response JSON berisi token autentikasi atau pesan kesalahan.
 */
router.post('/signIn', signIn);

/**
 * Endpoint untuk pendaftaran pengguna baru.
 * 
 * @route POST /signUp
 * @access Public
 * @body {string} username - Nama pengguna baru.
 * @body {string} email - Email pengguna baru.
 * @body {string} password - Kata sandi pengguna baru.
 * @returns {object} Response JSON berisi pesan keberhasilan atau kesalahan.
 */
router.post('/signUp', signUp);

/**
 * Endpoint untuk mengubah email pengguna.
 * 
 * @route POST /editEmail
 * @access Public
 * @body {string} username - Nama pengguna yang emailnya akan diubah.
 * @body {string} email - Email baru.
 * @returns {object} Response JSON berisi pesan keberhasilan atau kesalahan.
 */
router.post('/editEmail', editEmail);

/**
 * Endpoint untuk mendapatkan email pengguna berdasarkan nama pengguna.
 * 
 * @route GET /getEmail
 * @access Public
 * @query {string} username - Nama pengguna.
 * @returns {object} Response JSON berisi email pengguna atau pesan kesalahan.
 */
router.get('/getEmail', getEmails);

module.exports = router;
