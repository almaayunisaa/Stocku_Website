const express = require('express');
const {tambahKategori, hapusKategori, editCategory} = require('../controller/categoryController');

const router = express.Router();

router.post('/kategori', tambahKategori);
router.delete('/kategori/:namaKategori', hapusKategori);
router.put('/kategori/:namaKategori', editCategory);

module.exports=router;