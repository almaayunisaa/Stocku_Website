const product = require('../models/product');
const db = require('../config/db');
const mysql = require('mysql2/promise');
const xlsx = require('xlsx');
const fs = require('fs'); 
const tf = require('@tensorflow/tfjs'); 

const cariProduk = async (req, res) => {
    try {
        const {namaProduk} = req.body;
        
        if (!namaProduk) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const produk = await product.findName(namaProduk);

        if (produk.length===0) {
            return res.status(404).json({message : 'Ups! Barang yang Anda cari Tidak dapat ditemukan'});
        }

        res.status(201).json(produk);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const tambahProduk = async (req, res) => {
    try {
        const {namaProduk, id, stok, harga, deskripsi} = req.body;
        const namaCat = req.params.namaKategori;
        const cek = null;
        const prediksi = null;

        if (!namaProduk || !stok || !id || !harga || !deskripsi) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        if (isNaN(stok) || isNaN(harga)) {
            return res.status(400).json({ message: "Stok dan harga harus berupa angka" });
        }

        if (product.findID(id)>0) {
            return res.status(400).json({ message: "ID sudah digunakan" });
        }

        const produk = await product.create(namaCat, namaProduk, id, stok, harga, cek, prediksi, deskripsi);

        if (!produk) {
            return res.status(401).json({ message: 'Barang gagal ditambahkan' });
        }

        res.status(201).json({
            message: "Yey Barang Anda Berhasil ditambahkan!",
            produk,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const hapusProduk = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const found = await product.findID(id);

        if (found.length===0) {
            return res.status(400).json({ message: "Produk tidak ada" });
        }

        const produk = await product.delete(id);

        if (!produk) {
            return res.status(404).json({message : 'Barang tidak ada'});
        }

        res.status(200).json({
            message: 'Produk berhasil dihapus',
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editNama = async (req, res) => {
    try {
        const {id} = req.params;
        const {namaProduk} = req.body;

        const found = await product.findID(id);

        if (found.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        if (!namaProduk) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const produk = await product.editNama(id, namaProduk);

        if (!produk) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editStok = async (req, res) => {
    try {
        const {id} = req.params;
        const {stok} = req.body;

        const found = await product.findID(id);

        if (found.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        if (!stok) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        if (isNaN(stok)) {
            return res.status(400).json({ message: "Stok harus berupa angka" });
        }

        const produk = await product.editStok(id, stok);

        if (!produk) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editHarga = async (req, res) => {
    try {
        const {id} = req.params;
        const {harga} = req.body;

        const found = await product.findID(id);

        if (found.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        if (!harga) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        if (isNaN(harga)) {
            return res.status(400).json({ message: "Harga harus berupa angka" });
        }

        const produk = await product.editHarga(id, harga);

        if (!produk) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editPrediksi = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await product.getTanggalHabisNStok(id);
    const dataBaru = data.map((item, index, array) => {
      if (index === 0) {
        return { ...item, selisih_hari: 0 };
      }

      const date1 = new Date(array[index - 1].tanggal_habis);
      const date2 = new Date(item.tanggal_habis);
      const selisih = date2 - date1; 
      const selisihHari = selisih / (1000 * 60 * 60 * 24); 
  
      return { ...item, selisih_hari: selisihHari }; 
    }).filter(item=>item.selisih_hari>0);

    const selisih_hari = dataBaru.map(item => item.selisih_hari);
    const dataStok = dataBaru.map(item => item.Stok);
    days = -1;
    while (days<0) {
        const x = tf.tensor2d(selisih_hari, [selisih_hari.length, 1]);
        const y = tf.tensor2d(dataStok, [dataStok.length, 1]);
    
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] })); 

        model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

        await model.fit(x, y, { epochs: 100 });

        const slope = model.layers[0].getWeights()[0].dataSync()[0];
        const intercept = model.layers[0].getWeights()[1].dataSync()[0];
    
        days = Math.floor(-intercept / slope);
    }
    res.status(200).json({ message: 'Berhasil diprediksi', days});
    } catch (err) {
      res.status(500).json({error: err.message});
    }
}

const editCek = async (req, res) => {
    try {
        const {id} = req.params;
        const {cek} = req.body;

        const found = await product.findID(id);

        if (found.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        if (!cek) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const produk = await product.editCek(id, cek);

        if (!produk) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editDes = async (req, res) => {
    try {
        const {id} = req.params;
        const {deskripsi} = req.body;

        const found = await product.findID(id);

        if (found.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        if (!deskripsi) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const produk = product.editDes(id, deskripsi);

        if (!produk) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports={cariProduk, tambahProduk, hapusProduk, editNama, editStok, editHarga, editPrediksi, editCek, editDes};