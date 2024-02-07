const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

// static signup method
UserSchema.statics.signup = async (username, password) => {
    const exists = await this.findOne({ username });
    if (exists) {
        throw Error("User already exists.");
    }
}

module.exports = mongoose.model("User", UserSchema);  