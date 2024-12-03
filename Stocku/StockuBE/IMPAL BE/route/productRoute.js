const express = require('express');
const {cariProduk, tambahProduk, hapusProduk, editNama, editStok, editHarga, editPrediksi, editCek, editDes, konversiExcel} = require('../controller/productController');

const router = express.Router();

router.get('/cariProduk', cariProduk);
router.post('/:namaKategori/tambahProduk', tambahProduk);
router.delete('/:namaKategori/hapusProduk/:id', hapusProduk);
router.patch('/:namaKategori/editNama/:id', editNama);
router.patch('/:namaKategori/editStok/:id', editStok);    
router.patch('/:namaKategori/editHarga/:id', editHarga);
router.patch('/:namaKategori/editPrediksi/:id', editPrediksi);
router.patch('/:namaKategori/editCek/:id', editCek);
router.patch('/:namaKategori/editDes/:id', editDes);

module.exports=router;