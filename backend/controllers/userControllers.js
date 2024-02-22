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
        res.status(200).json({ _id: user._id, email, token })
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
        res.status(200).json({ _id: user._id, email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const updateUser = async (req, res) => {
    const { email, newEmail, newPassword, typedPassword } = req.body;
    try {
        const updatedUser = await User.update(email, newEmail, newPassword, typedPassword);
        res.status(200).json({ updatedUser, message: "Your account details were successfully updated" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const user = await User.delete(id, password);
        res.status(200).json({ user })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getUsers = async (req, res) => {
    res.json({ mssg: "Nothing to see here" });
}

module.exports = { loginUser, signupUser, getUsers, deleteUser, updateUser }