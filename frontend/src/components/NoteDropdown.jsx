import React, { forwardRef, useContext } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { notesContext } from './Notes';
import { createNoteDB, deleteNoteDB, getNotesDB, updateNoteDB, updateManyNotesDB } from '../api';

const NoteDropdown = forwardRef((props, ref) => {

    // get note notes 
    const { notes, setNotes } = useContext(notesContext);

    // delete note --> update state (decrement z-index of all notes in front of deleted by one), then save to DB
    const handleDelete = async () => {
        var updatedNotes = notes.filter(note => note._id !== props.id);
        const noteZindex = notes.find(note => note._id === props.id).zIndex;
        updatedNotes = updatedNotes.map(note => note.zIndex > noteZindex ? { ...note, zIndex: note.zIndex - 1 } : note)
        setNotes(updatedNotes);
        deleteNoteDB(props.id);
        await updateManyNotesDB(noteZindex, true)
    }

    // duplicate note --> create note with updated z-index and position, create it in the databse
    // before updating state, otherwise mismatch between state and DB because of lack of _id in state
    const handleDuplicate = async () => {
        const thisNote = notes.find(note => note._id === props.id);
        const newNote = {
            ...thisNote,
            position: [thisNote.position[0] + 20, thisNote.position[1] + 20],
            zIndex: notes.length + 1
        };
        await createNoteDB(newNote);
        const updatedNotes = await getNotesDB();
        setNotes(updatedNotes);
    }

    // send note backward / bring forward --> get hold of current note and if forward the one just in front of it
    // in z-space, else the one jsut behind it in z-space. Then switch around the two notes' z-indices
    // For speed, update state first, then update DB after in the background
    const handleReorderNotes = (forward) => {
        const noteOne = notes.find(note => note._id === props.id);
        if ((forward && noteOne.zIndex === notes.length) || (!forward && noteOne.zIndex === 1)) return;
        const noteTwo = notes.find(note => forward ? note.zIndex === noteOne.zIndex + 1 : note.zIndex === noteOne.zIndex - 1);
        const updatedNotes = notes.map(note => {
            if (note._id === noteOne._id) { return { ...note, zIndex: noteTwo.zIndex } }
            else if (note._id === noteTwo._id) { return { ...note, zIndex: noteOne.zIndex } }
            return note;
        })
        setNotes([...updatedNotes]);
        updateNoteDB(noteOne._id, { zIndex: noteTwo.zIndex })
        updateNoteDB(noteTwo._id, { zIndex: noteOne.zIndex })
    }

    // bring note to front --> set note's z-index to notes.length and decrement z-index of all notes
    // that were in front of this note before it was moved to front by one
    const handleBringToFront = async () => {
        const thisNote = notes.find(note => note._id === props.id);
        if (thisNote.zIndex === notes.length) return;
        const updatedNotes = notes.map(note => {
            if (note._id === thisNote._id) {
                return { ...note, zIndex: notes.length }
            } else if (note.zIndex > thisNote.zIndex) {
                return { ...note, zIndex: note.zIndex - 1 }
            } return note;
        });
        setNotes([...updatedNotes]);
        await updateManyNotesDB(thisNote.zIndex, true);
        updateNoteDB(thisNote._id, { zIndex: notes.length });
    }

    const handleSendToback = async () => {
        const thisNote = notes.find(note => note._id === props.id);
        if (thisNote.zIndex === 1) return;
        const updatedNotes = notes.map(note => {
            if (note._id === thisNote._id) {
                return { ...note, zIndex: 1 }
            } else if (note.zIndex < thisNote.zIndex) {
                return { ...note, zIndex: note.zIndex + 1 }
            } return note;
        });
        setNotes([...updatedNotes]);
        await updateManyNotesDB(thisNote.zIndex, false);
        updateNoteDB(thisNote._id, { zIndex: 1 });
    }

    return (
        <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5} style={{ zIndex: notes.length + 1 }}>
                <DropdownMenu.Arrow className="DropdownMenuArrow" />
                <DropdownMenu.Item onClick={() => handleReorderNotes(true)} className="DropdownMenuItem">Bring Forward</DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleBringToFront} className="DropdownMenuItem">Bring To Front</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item onClick={() => handleReorderNotes(false)} className="DropdownMenuItem">Send Backward</DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleSendToback} className="DropdownMenuItem">Send To Back</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item onClick={handleDuplicate} className="DropdownMenuItem">Duplicate Note</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item
                    className="DropdownMenuItem"
                    onClick={handleDelete}
                    style={{ color: "red" }}>Delete Note</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    )
})

export default NoteDropdown