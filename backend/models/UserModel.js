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
        throw Error("Invalid email address.");
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

UserSchema.statics.update = async function (email, newEmail, newPassword, typedPassword) {

    const user = await this.findOne({ email });
    let password = user.password;

    const isCorrectPassword = await bcrypt.compare(typedPassword, password);
    if (!isCorrectPassword) {
        throw Error("Incorrect password");
    }

    // check if email is valid
    if (!validator.isEmail(newEmail)) {
        throw Error("Invalid email address.")
    }

    // Check if new email already exists as another user
    if (newEmail !== email) {
        const anotherUserExists = await this.findOne({ email: newEmail });
        if (anotherUserExists) throw Error("Another user with that email address already exists.")
    }

    // password changed, but not email
    if (newPassword) {
        if (!validator.isStrongPassword(newPassword)) {
            throw Error("Password is too weak.");
        } else if (typedPassword === newPassword) {
            throw Error("You cannot change your password to what it already is.")
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await this.findOneAndUpdate({ email }, { password, email: !newEmail ? email : newEmail }, { returnDocument: 'after' })
    return updatedUser;

}

UserSchema.statics.delete = async function (id, password) {

    const user = await this.findOne({ _id: id });
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
        throw Error("Incorrect password");
    }

    const deleted = await this.findOneAndDelete({ _id: id });
    if (!deleted) throw Error("Something went wrong. User was not deleted.")
    return deleted;

}

module.exports = mongoose.model("User", UserSchema);  