const express = require('express');
const router = express.Router();

// controller functions
const { loginUser, signupUser } = require('../controllers/userControllers')

// log in
router.post('/login', loginUser)

// sign up
router.post('/signup', signupUser)

module.exports = router;