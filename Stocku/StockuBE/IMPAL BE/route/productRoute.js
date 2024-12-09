const express = require('express');
const {cariProduk, tambahProduk, hapusProduk, editProduk, editPrediksi, editCek, getProduct, getProduct_ID, sortASC, sortDESC} = require('../controller/productController');

const router = express.Router();

router.get('/cariProduk', cariProduk);
router.get('/:namaKategori/getProduct', getProduct);
router.get('/getProductNama', getProduct_ID);
router.post('/:namaKategori/sortASC', sortASC);
router.post('/:namaKategori/sortDSC', sortDESC);
router.post('/:namaKategori/tambahProduk', tambahProduk);
router.delete('/hapusProduk/:id', hapusProduk);
router.patch('/editProduk/:id', editProduk);
router.patch('/editPrediksi/:id', editPrediksi);
router.patch('/editCek/:id', editCek);


module.exports=router;