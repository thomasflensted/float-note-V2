const express = require('express');
const router = express.Router();

// controller functions
const { loginUser, signupUser, getUsers, deleteUser, updateUser } = require('../controllers/userControllers')

// log in
router.post('/login', loginUser)

// sign up
router.post('/signup', signupUser)

// update user
router.patch('/update', updateUser)

// delete all users
router.delete('/:id', deleteUser)

// show message
router.get('/', getUsers)

module.exports = router;