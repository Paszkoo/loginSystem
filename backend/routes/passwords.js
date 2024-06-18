const express = require('express');

// const { loginUser, signupUser } = require('../controllers/userController');
const { getAllPasswords, delPassword, addNewPassword } = require('../controllers/passwordsController');

const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

// authorize access with JWT token
router.use(requireAuth)

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