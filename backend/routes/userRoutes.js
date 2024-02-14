const express = require('express');
const router = express.Router();

// controller functions
const { loginUser, signupUser, getUsers, deleteUser } = require('../controllers/userControllers')

// log in
router.post('/login', loginUser)

// sign up
router.post('/signup', signupUser)

// get all users
router.get('/', getUsers);

// delete all users
router.delete('/:id', deleteUser)

module.exports = router;