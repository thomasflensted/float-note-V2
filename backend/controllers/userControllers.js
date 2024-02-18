const UserModel = require('../models/UserModel');
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: '5d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// signup user 
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id)
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOneAndDelete({ _id: id });
        user
            ? res.status(200).json({ message: `User with id ${id} was deleted.` })
            : res.status(400).json({ message: 'Something went wrong' })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { loginUser, signupUser, getUsers, deleteUser }