const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

UserSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error("All fields must be filled out.")
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Wrong email.");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password.");
    }

    return user;
}

// static signup method
UserSchema.statics.signup = async function (email, password) {

    if (!email || !password) {
        throw Error("All fields must be filled out.")
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("User already exists.");
    }

    if (!validator.isEmail(email)) {
        throw Error("Invalid email.");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is too weak.");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });
    return user;
}

module.exports = mongoose.model("User", UserSchema);  