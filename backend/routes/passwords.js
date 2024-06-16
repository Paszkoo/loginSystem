const express = require('express');

// const { loginUser, signupUser } = require('../controllers/userController');
const { getAllPasswords, delPassword, addNewPassword } = require('../controllers/passwordsController');

const router = express.Router();

router.post('/all', (req,res) => {
    getAllPasswords(req,res);
})

router.post('/delOne', (req,res) => {
    delPassword(req,res);
})

router.post('/newPassword', (req,res) => {
    addNewPassword(req,res);
})

module.exports = router;