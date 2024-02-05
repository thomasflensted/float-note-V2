const express = require('express');
const router = express.Router();
const Note = require('./NoteModel');
const { getNotes, getNote, postNote, deleteNote, patchNote } = require('./controllers')

// get single note
router.get('/:id', getNote)

// get all notes
router.get('/', getNotes)

// create // insert note
router.post('/', postNote)

// update existing note
router.patch('/:id', patchNote)

// delete note
router.delete('/:id', deleteNote)

module.exports = router; 