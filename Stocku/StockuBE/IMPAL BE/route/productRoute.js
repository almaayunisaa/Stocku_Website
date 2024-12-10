const express = require('express');
const {cariProduk, tambahProduk, hapusProduk, editProduk, editPrediksi, editCek, getProduct, getProduct_ID, sortASC, sortDESC, getReport, getOldProd, setOldProd} = require('../controller/productController');

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
router.get('/getReport', getReport);
router.get('/getOldProd', getOldProd);
router.post('/setOldProd', setOldProd);

module.exports=router;