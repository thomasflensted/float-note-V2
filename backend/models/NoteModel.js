const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    heading: { type: String },
    text: { type: String },
    size: { type: Array, required: true },
    position: { type: Array, required: true },
    color: { type: String, required: true },
    zIndex: { type: Number, required: true },
    user_id: { type: String, required: true }
})

module.exports = mongoose.model("Note", NoteSchema);