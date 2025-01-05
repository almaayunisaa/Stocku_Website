// Mengimpor modul yang diperlukan
const product = require('../models/product');
const category = require('../models/kategori');
const db = require('../config/db');
const mysql = require('mysql2/promise');
const xlsx = require('xlsx');
const fs = require('fs'); 
const tf = require('@tensorflow/tfjs');

/**
 * Mencari produk berdasarkan nama.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil pencarian.
 */
const cariProduk = async (req, res) => {
    try {
        const { namaProduk } = req.body;

        // Validasi input
        if (!namaProduk) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        // Cari produk
        const produk = await product.findName(namaProduk);
        if (produk.length === 0) {
            return res.status(404).json({ message: 'Ups! Barang yang Anda cari Tidak dapat ditemukan' });
        }

        res.status(201).json(produk);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Menambahkan produk baru.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil operasi.
 */
const tambahProduk = async (req, res) => {
    try {
        const { namaProduk, id, stok, harga, deskripsi } = req.body;
        const namaCat = req.params.namaKategori;
        const cek = null;
        const prediksi = null;

        // Validasi input
        if (!namaProduk || !stok || !id || !harga || !deskripsi) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        if (isNaN(stok) || isNaN(harga)) {
            return res.status(400).json({ message: "Stok dan harga harus berupa angka" });
        }

        if (await product.findID(id) > 0) {
            return res.status(400).json({ message: "ID sudah digunakan" });
        }

        if (await category.find(namaCat) === 0) {
            return res.status(400).json({ message: "Kategori tidak ada" });
        }

        // Tambah produk
        const produk = await product.create(namaCat, namaProduk, id, stok, harga, null, null, deskripsi);
        if (!produk) {
            return res.status(401).json({ message: 'Barang gagal ditambahkan' });
        }

        res.status(201).json({ message: "Yey Barang Anda Berhasil ditambahkan!", produk });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Menghapus produk berdasarkan ID.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil operasi.
 */
const hapusProduk = async (req, res) => {
    try {
        const { id } = req.params;

        // Cek keberadaan produk
        const found = await product.findID(id);
        if (found.length === 0) {
            return res.status(400).json({ message: "Produk tidak ada" });
        }

        // Hapus produk
        const produk = await product.delete(id);
        if (!produk) {
            return res.status(404).json({ message: 'Barang tidak ada' });
        }

        res.status(200).json({ message: 'Produk berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mengedit data produk.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil operasi.
 */
const editProduk = async (req, res) => {
    try {
        const { id } = req.params;
        const { namaProduk, stok, harga, deskripsi } = req.body;

        // Validasi input
        const found = await product.findID(id);
        if (found.length === 0) {
            return res.status(404).json({ message: 'Produk Tidak Valid' });
        }

        if (!namaProduk || !stok || !harga || !deskripsi) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        if (isNaN(stok) || isNaN(harga)) {
            return res.status(400).json({ message: "Stok atau harga harus berupa angka" });
        }

        const namaEdited = await product.editNama(id, namaProduk);

        if (!namaEdited) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        const stokEdited = await product.editStok(id, stok);

        if (!stokEdited) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        const hargaEdited = await product.editHarga(id, harga);

        if (!hargaEdited) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        const desEdited = await product.editDes(id, deskripsi);

        if (!desEdited) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Memproses prediksi berdasarkan data produk lama.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil prediksi.
 */
const editPrediksi = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await product.getTanggalHabisNStok(id);

        // Data preprocessing untuk TensorFlow
        const dataBaru = data.map((item, index, array) => {
            if (index === 0) {
                return { ...item, selisih_hari: 0 };
            }

            const date1 = new Date(array[index - 1].tanggal_habis);
            const date2 = new Date(item.tanggal_habis);
            const selisihHari = (date2 - date1) / (1000 * 60 * 60 * 24); 

            return { ...item, selisih_hari: selisihHari }; 
        }).filter(item => item.selisih_hari > 0);

        const selisih_hari = dataBaru.map(item => item.selisih_hari);
        const dataStok = dataBaru.map(item => item.Stok);

        days = -1;
        while (days<0) {
            const maxSelisih = Math.max(...selisih_hari);
            const maxStok = Math.max(...dataStok);

            const normalizedSelisih = selisih_hari.map(val => val / maxSelisih);
            const normalizedStok = dataStok.map(val => val / maxStok);

            const x = tf.tensor2d(normalizedSelisih, [normalizedSelisih.length, 1]);
            const y = tf.tensor2d(normalizedStok, [normalizedStok.length, 1]);
    
            const model = tf.sequential();
            model.add(tf.layers.dense({ units: 1, inputShape: [1] })); 

            model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

            await model.fit(x, y, { epochs: 100 });

            const slope = model.layers[0].getWeights()[0].dataSync()[0];
            const intercept = model.layers[0].getWeights()[1].dataSync()[0];
            days = Math.floor(-intercept / slope);
        }

        res.status(200).json({ message: 'Berhasil diprediksi', hari: days });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mengedit status "cek" suatu produk.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil operasi.
 */
const editCek = async (req, res) => {
    try {
        const { id } = req.params;
        const { cek } = req.body;

        // Validasi keberadaan produk
        const found = await product.findID(id);
        if (found.length === 0) {
            return res.status(404).json({ message: 'Produk Tidak Valid' });
        }

        if (!cek) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const produk = await product.editCek(id, cek);
        if (!produk) {
            return res.status(404).json({ message: 'Produk Tidak Valid' });
        }

        res.status(200).json({ message: 'Berhasil diperbarui' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mendapatkan daftar produk berdasarkan kategori.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil operasi.
 */
const getProduct = async (req, res) => {
    try {
        const product_list = await product.get(req.params.namaKategori);

        if (product_list.length === 0) {
            return res.status(401).json({ message: 'Produk tidak ada' });
        }

        return res.status(200).json({ products: product_list });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mendapatkan informasi produk berdasarkan ID.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil operasi.
 */
const getProduct_ID = async (req, res) => {
    try {
        const { produk } = req.query;

        const product_list = await product.getWithID(produk);

        if (product_list.length === 0) {
            return res.status(401).json({ message: 'Produk tidak ada' });
        }

        return res.status(200).json({ products: product_list });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mengurutkan produk berdasarkan harga (ascending).
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil operasi.
 */
const sortASC = async (req, res) => {
    try {
        const namaCat = req.params.namaKategori;
        const sorted = await product.sort_asc(namaCat);

        if (!sorted) {
            return res.status(401).json({ message: 'Sorting tidak berhasil' });
        }

        return res.status(200).json({ products: sorted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mengurutkan produk berdasarkan harga (descending).
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil operasi.
 */
const sortDESC = async (req, res) => {
    try {
        const namaCat = req.params.namaKategori;
        const sorted = await product.sort_dsc(namaCat);

        if (!sorted) {
            return res.status(401).json({ message: 'Sorting tidak berhasil' });
        }

        return res.status(200).json({ products: sorted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mengambil laporan data produk.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil laporan.
 */
const getReport = async (req, res) => {
    try {
        const data = await product.getData();

        if (!data) {
            return res.status(401).json({ message: 'Tidak dapat mengambil data' });
        }

        return res.status(200).json({ datas: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mendapatkan produk lama berdasarkan ID.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan data produk lama.
 */
const getOldProd = async (req, res) => {
    try {
        const id = req.query.id;
        const oldproduct_list = await product.getTanggalHabisNStok(id);

        if (oldproduct_list.length === 0) {
            return res.status(401).json({ message: 'Produk tidak ada' });
        }

        return res.status(200).json({ oldproducts: oldproduct_list });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Menambahkan data stok lama.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan hasil operasi.
 */
const setOldProd = async (req, res) => {
    try {
        const id = req.query.id;
        const stok = req.query.stok;
        const harga = req.query.harga;
        const id_prod = req.query.id_prod;
        const tgl_hbs = req.query.tgl_hbs;

        const updated = await product.setStokOld(id, stok, harga, id_prod, tgl_hbs);

        if (!updated) {
            return res.status(401).json({ message: 'Tidak dapat ditambah' });
        }

        return res.status(200).json({ message: 'Berhasil ditambah' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Mengambil semua data stok lama.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan data.
 */
const getOldData = async (req, res) => {
    try {
        const data = await product.getDataOld();

        if (!data) {
            return res.status(401).json({ message: 'Tidak dapat mengambil data' });
        }

        return res.status(200).json({ datas: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ekspor fungsi untuk digunakan dalam router
module.exports = {
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
    getOldData,
};
