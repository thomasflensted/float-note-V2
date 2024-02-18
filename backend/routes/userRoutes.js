const express = require('express');
const router = express.Router();

// controller functions
const { loginUser, signupUser, deleteUser } = require('../controllers/userControllers')

// log in
router.post('/login', loginUser)

// sign up
router.post('/signup', signupUser)

// delete all users
router.delete('/:id', deleteUser)

module.exports = router;