// AZIZAH 1301220021 INDIVIDU OTP
const express = require('express');
const {kirimOTP, verifikasiOTP} = require('../controller/redisController');

const router = express.Router();

router.post('/kirimOTP', kirimOTP);
router.post('/verifikasiOTP', verifikasiOTP);

module.exports = otpRoute;
