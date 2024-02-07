const User = require('../models/UserModel')

// login user
const loginUser = async (req, res) => {
    res.json({ mssg: "log in user" })
}

// signup user 
const signupUser = async (req, res) => {
    res.json({ mssg: "sign up user" })
}

module.exports = { loginUser, signupUser }