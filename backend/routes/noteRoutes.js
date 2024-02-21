const express = require('express');
const { getNotes, getNote, postNote, deleteNote, patchNote, patchMany } = require('../controllers/controllers')
const requireAuth = require('../middleware/requireAuth');
const { deleteMany } = require('../models/UserModel');

const router = express.Router();
router.use(requireAuth);

// get single note
router.get('/:id', getNote)

// get all notes
router.get('/', getNotes)

// create // insert note
router.post('/', postNote)

// update existing note
router.patch('/:id', patchNote)

// update multiple notes
router.patch('/', patchMany)

// delete note
router.delete('/:id', deleteNote)

router.delete('/user/:user_id', deleteMany)

module.exports = router; 