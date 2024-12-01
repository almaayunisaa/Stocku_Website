const express = require('express');
const {signUp, signIn, editEmail} = require('../controller/authController');

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/editEmail', editEmail);

module.exports=router;
