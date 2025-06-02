const express = require('express');
const {tambahKategori, hapusKategori, editCategory, ambilKategori} = require('../controller/categoryController');

const router = express.Router();

router.post('/kategori', tambahKategori);
router.delete('/kategori/:namaKategori', hapusKategori);
router.put('/kategori/:namaKategori', editCategory);
router.get('/getKategori', ambilKategori);

module.exports=router;