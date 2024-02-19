const express = require('express');
const router = express.Router();

// controller functions
const { loginUser, signupUser, getUsers, deleteUser } = require('../controllers/userControllers')

// log in
router.post('/login', loginUser)

// sign up
router.post('/signup', signupUser)

// delete all users
router.delete('/:id', deleteUser)

router.get('/', getUsers)

module.exports = router;