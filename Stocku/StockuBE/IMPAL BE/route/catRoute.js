/**
 * Router untuk mengelola kategori.
 *
 * Berisi endpoint untuk menambahkan, menghapus, mengedit, dan mengambil data kategori.
 * Menggunakan controller `categoryController`.
 *
 * @module routes/categoryRoutes
 */

const express = require('express');
const { tambahKategori, hapusKategori, editCategory, ambilKategori } = require('../controller/categoryController');

const router = express.Router();

/**
 * Endpoint untuk menambahkan kategori baru.
 * 
 * @route POST /kategori
 * @access Public
 * @body {string} namaKategori - Nama kategori yang akan ditambahkan.
 * @returns {object} Response JSON berisi pesan keberhasilan atau kesalahan.
 */
router.post('/kategori', tambahKategori);

/**
 * Endpoint untuk menghapus kategori berdasarkan nama.
 * 
 * @route DELETE /kategori/:namaKategori
 * @access Public
 * @param {string} namaKategori - Nama kategori yang akan dihapus.
 * @returns {object} Response JSON berisi pesan keberhasilan atau kesalahan.
 */
router.delete('/kategori/:namaKategori', hapusKategori);

/**
 * Endpoint untuk mengedit kategori berdasarkan nama.
 * 
 * @route PUT /kategori/:namaKategori
 * @access Public
 * @param {string} namaKategori - Nama kategori yang akan diubah.
 * @body {string} editNama - Nama baru kategori.
 * @returns {object} Response JSON berisi pesan keberhasilan atau kesalahan.
 */
router.put('/kategori/:namaKategori', editCategory);

/**
 * Endpoint untuk mengambil semua kategori.
 * 
 * @route GET /getKategori
 * @access Public
 * @returns {object} Response JSON berisi daftar kategori atau pesan kesalahan.
 */
router.get('/getKategori', ambilKategori);

module.exports = router;
