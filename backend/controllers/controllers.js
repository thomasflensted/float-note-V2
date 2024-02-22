const Note = require('../models/NoteModel');

// get one note by id
const getNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.find({ _id: id });
        res.status(200).json(note);
    } catch (err) {
        res.json({ error: err.message })
    }
}

// get all notes in collection
const getNotes = async (req, res) => {
    try {
        const user_id = req.user._id;
        const notes = await Note.find({ user_id })
        res.status(200).json(notes);
    } catch (err) {
        res.json({ error: err.message });
    }
}

// create new note
const postNote = async (req, res) => {
    const user_id = req.user.id;
    const { heading, text, size, position, color, zIndex } = req.body;
    try {
        const note = await Note.create({ heading, text, size, position, color, zIndex, user_id })
        res.status(200).json(note);
    } catch (err) {
        res.json({ error: err.message });
    }
}

// update note by id
const patchNote = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Note.findOneAndUpdate({ _id: id }, { ...req.body })
        result
            ? res.status(200).json(result)
            : res.status(404).json({ mssg: "couldn't update note" })
    } catch (err) {
        res.json({ error: err.message })
    }
}

// update z-indices when deleting or reordering
const patchMany = async (req, res) => {
    const { zValue, forward } = req.body;
    var result;
    try {
        result = await Note.updateMany(
            { zIndex: forward ? { $gt: zValue } : { $lt: zValue } },
            { $inc: forward ? { "zIndex": -1 } : { "zIndex": 1 } })
    } catch (err) {
        res.json({ error: err.message })
    }
    result
        ? res.status(200).json(result)
        : res.status(404).json({ mssg: "something went wrong" })
}

// delete note by id
const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Note.findOneAndDelete({ _id: id });
        result
            ? res.status(200).json({ deleted: result })
            : res.status(404).json({ mssg: "No note matched the id" })
    } catch (err) {
        res.json({ error: err.message })
    }
}

const deleteManyNotes = async (req, res) => {
    const user_id = req.user.id;
    try {
        const result = await Note.deleteMany({ user_id });
        res.status(200).json({ result: `Deleted ${result.deletedCount} notes` });
    } catch (err) {
        res.json({ error: err.message })
    }
}

module.exports = {
    getNote,
    getNotes,
    postNote,
    patchNote,
    deleteNote,
    patchMany,
    deleteManyNotes
}