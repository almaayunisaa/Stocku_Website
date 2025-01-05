/**
 * File utama untuk menjalankan server API.
 *
 * Menggunakan Express sebagai framework utama dan Body-Parser serta CORS untuk pengelolaan request.
 * Menyediakan endpoint terkait autentikasi, kategori, dan produk.
 *
 * @module server
 */

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5500;
const bp = require('body-parser');
const authRoute = require('../route/routeAuthentication');
const catRoute = require('../route/catRoute');
const productRoute = require('../route/productRoute');

// Middleware

/**
 * Middleware untuk mengaktifkan CORS (Cross-Origin Resource Sharing).
 * 
 * @middleware
 */
app.use(cors());

/**
 * Middleware untuk mem-parsing request JSON menggunakan Body-Parser.
 * 
 * @middleware
 */
app.use(bp.json());

/**
 * Routing untuk endpoint autentikasi.
 * 
 * Prefix: `/api/auth`
 * Menggunakan router dari `../route/routeAuthentication`.
 */
app.use('/api/auth', authRoute);

/**
 * Routing untuk endpoint kategori.
 * 
 * Prefix: `/api/category`
 * Menggunakan router dari `../route/catRoute`.
 */
app.use('/api/category', catRoute);

/**
 * Routing untuk endpoint produk.
 * 
 * Prefix: `/api/product`
 * Menggunakan router dari `../route/productRoute`.
 */
app.use('/api/product', productRoute);

// Server Initialization

/**
 * Memulai server dan mendengarkan pada port yang ditentukan.
 * 
 * @listens {number} port - Port tempat server dijalankan.
 */
app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});
