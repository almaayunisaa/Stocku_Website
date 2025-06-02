const express = require('express');
const {signUp, signIn, editEmail, getEmails} = require('../controller/authController');

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/editEmail', editEmail);
router.get('/getEmail', getEmails)

module.exports=router;
