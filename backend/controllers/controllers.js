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
        const notes = await Note.find({})
        res.status(200).json(notes);
    } catch (err) {
        res.json({ error: err.message });
    }
}

// create new note
const postNote = async (req, res) => {
    const { heading, text, size, position, color, zIndex } = req.body;
    try {
        const note = await Note.create({ heading, text, size, position, color, zIndex })
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

const patchMultiple = async (req, res) => {
    const { initialZvalue } = req.body;
    try {
        const result = await Note.updateMany(
            { zValue: { $gt: initialZvalue } },
            { $inc: { "zIndex": -1 } }
        )
        result
            ? res.status(200).json(initialZvalue)
            : res.status(404).json({ mssg: "couldn't update note" })
    } catch (err) {
        res.json({ error: err.message })
    }
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

module.exports = {
    getNote,
    getNotes,
    postNote,
    patchNote,
    deleteNote,
    patchMultiple,
}