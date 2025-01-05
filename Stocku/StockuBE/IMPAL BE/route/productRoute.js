/**
 * Router untuk mengelola produk.
 *
 * Berisi endpoint untuk pencarian, penambahan, pengeditan, penghapusan, dan pengelolaan data produk.
 * Menggunakan controller `productController`.
 *
 * @module routes/productRoutes
 */

const express = require('express');
const {
    cariProduk, 
    tambahProduk, 
    hapusProduk, 
    editProduk, 
    editPrediksi, 
    editCek, 
    getProduct, 
    getProduct_ID, 
    sortASC, 
    sortDESC, 
    getReport, 
    getOldProd, 
    setOldProd, 
    getOldData
} = require('../controller/productController');

const router = express.Router();

/**
 * Endpoint untuk mencari produk berdasarkan nama.
 * 
 * @route GET /cariProduk
 * @access Public
 * @query {string} namaProduk - Nama produk yang dicari.
 * @returns {object} Response JSON berisi produk yang sesuai atau pesan kesalahan.
 */
router.get('/cariProduk', cariProduk);

/**
 * Endpoint untuk mendapatkan daftar produk berdasarkan kategori.
 * 
 * @route GET /:namaKategori/getProduct
 * @access Public
 * @param {string} namaKategori - Nama kategori produk.
 * @returns {object} Response JSON berisi daftar produk dalam kategori tertentu.
 */
router.get('/:namaKategori/getProduct', getProduct);

/**
 * Endpoint untuk mendapatkan produk berdasarkan ID atau nama.
 * 
 * @route GET /getProductNama
 * @access Public
 * @query {string} produk - Nama atau ID produk.
 * @returns {object} Response JSON berisi data produk atau pesan kesalahan.
 */
router.get('/getProductNama', getProduct_ID);

/**
 * Endpoint untuk mengurutkan produk dalam kategori secara ascending.
 * 
 * @route POST /:namaKategori/sortASC
 * @access Public
 * @param {string} namaKategori - Nama kategori produk.
 * @returns {object} Response JSON berisi produk yang diurutkan.
 */
router.post('/:namaKategori/sortASC', sortASC);

/**
 * Endpoint untuk mengurutkan produk dalam kategori secara descending.
 * 
 * @route POST /:namaKategori/sortDSC
 * @access Public
 * @param {string} namaKategori - Nama kategori produk.
 * @returns {object} Response JSON berisi produk yang diurutkan.
 */
router.post('/:namaKategori/sortDSC', sortDESC);

/**
 * Endpoint untuk menambahkan produk baru ke kategori tertentu.
 * 
 * @route POST /:namaKategori/tambahProduk
 * @access Public
 * @param {string} namaKategori - Nama kategori produk.
 * @body {string} namaProduk - Nama produk.
 * @body {number} stok - Stok produk.
 * @body {number} harga - Harga produk.
 * @body {string} deskripsi - Deskripsi produk.
 * @returns {object} Response JSON berisi produk yang berhasil ditambahkan atau pesan kesalahan.
 */
router.post('/:namaKategori/tambahProduk', tambahProduk);

/**
 * Endpoint untuk menghapus produk berdasarkan ID.
 * 
 * @route DELETE /hapusProduk/:id
 * @access Public
 * @param {string} id - ID produk yang akan dihapus.
 * @returns {object} Response JSON berisi pesan keberhasilan atau kesalahan.
 */
router.delete('/hapusProduk/:id', hapusProduk);

/**
 * Endpoint untuk mengedit detail produk berdasarkan ID.
 * 
 * @route PATCH /editProduk/:id
 * @access Public
 * @param {string} id - ID produk yang akan diedit.
 * @body {string} namaProduk - Nama baru produk.
 * @body {number} stok - Stok baru produk.
 * @body {number} harga - Harga baru produk.
 * @body {string} deskripsi - Deskripsi baru produk.
 * @returns {object} Response JSON berisi pesan keberhasilan atau kesalahan.
 */
router.patch('/editProduk/:id', editProduk);

/**
 * Endpoint untuk mengedit prediksi produk berdasarkan ID.
 * 
 * @route PATCH /editPrediksi/:id
 * @access Public
 * @param {string} id - ID produk yang akan diedit prediksinya.
 * @returns {object} Response JSON berisi pesan keberhasilan atau kesalahan.
 */
router.patch('/editPrediksi/:id', editPrediksi);

/**
 * Endpoint untuk mengedit status cek produk berdasarkan ID.
 * 
 * @route PATCH /editCek/:id
 * @access Public
 * @param {string} id - ID produk yang akan diedit status ceknya.
 * @returns {object} Response JSON berisi pesan keberhasilan atau kesalahan.
 */
router.patch('/editCek/:id', editCek);

/**
 * Endpoint untuk mendapatkan laporan produk.
 * 
 * @route GET /getReport
 * @access Public
 * @returns {object} Response JSON berisi data laporan produk atau pesan kesalahan.
 */
router.get('/getReport', getReport);

/**
 * Endpoint untuk mendapatkan data stok produk lama berdasarkan ID.
 * 
 * @route GET /getOldProd
 * @access Public
 * @query {string} id - ID produk.
 * @returns {object} Response JSON berisi data stok produk lama.
 */
router.get('/getOldProd', getOldProd);

/**
 * Endpoint untuk menyimpan stok lama produk.
 * 
 * @route POST /setOldProd
 * @access Public
 * @query {string} id - ID produk.
 * @query {number} stok - Stok produk.
 * @query {number} harga - Harga produk.
 * @query {string} id_prod - ID produk lama.
 * @query {string} tgl_hbs - Tanggal habis stok.
 * @returns {object} Response JSON berisi pesan keberhasilan atau kesalahan.
 */
router.post('/setOldProd', setOldProd);

/**
 * Endpoint untuk mendapatkan semua data stok produk lama.
 * 
 * @route GET /getOldData
 * @access Public
 * @returns {object} Response JSON berisi data stok produk lama.
 */
router.get('/getOldData', getOldData);

module.exports = router;
