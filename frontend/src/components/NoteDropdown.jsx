import React, { forwardRef, useContext } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { notesContext } from './Notes';
import { sendToBack } from '../helperFuncs';
import { createNoteDB, deleteNoteDB, getNotesDB, updateNoteDB } from '../api';

const NoteDropdown = forwardRef((props, ref) => {

    // get note notes 
    const { notes, setNotes } = useContext(notesContext);

    // delete note --> update state, then save to DB, TODO: update z-indeces on delete
    const handleDelete = () => {
        const updatedNotes = notes.filter(note => note._id !== props.id);
        const noteZindex = notes.find(note => note._id === props.id).zIndex;
        console.log(noteZindex);
        setNotes(updatedNotes);
        deleteNoteDB(props.id);
        // update Z indeces
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

    // bring note to front --> set note's z-index to notes.length and decrement z-index of all notes
    // that were in front of this note before it was moved to front by one
    const handleBringToFront = async () => {
        console.log("bring to front");
    }

    // send note to back --> set note's z-index to 1 and increment z-index of all notes
    // that were behind this note before it was sent to back by one
    const handleSendToBack = () => {
        const updatedNotes = sendToBack(props.id, notes);
        setNotes([...updatedNotes]);
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

    return (
        <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5} style={{ zIndex: notes.length + 1 }}>
                <DropdownMenu.Arrow className="DropdownMenuArrow" />
                <DropdownMenu.Item onClick={() => handleReorderNotes(true)} className="DropdownMenuItem">Bring Forward</DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleBringToFront} className="DropdownMenuItem">Bring To Front</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item onClick={() => handleReorderNotes(false)} className="DropdownMenuItem">Send Backward</DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleSendToBack} className="DropdownMenuItem">Send To Back</DropdownMenu.Item>
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

/*const currentZindex = notes.find(note => note._id === props.id).zIndex;
        if (currentZindex === notes.length) return;
        var noteBehind = '';
        const updatedNotes = notes.map(note => {
            if (note._id === props.id) {
                return { ...note, zIndex: note.zIndex + 1 };
            } else if (note.zIndex === currentZindex + 1) {
                noteBehind = note._id;
                return { ...note, zIndex: currentZindex };
            } return note;
        })
        setNotes(updatedNotes);
        await updateNoteDB(props.id, { zIndex: currentZindex + 1 })
        await updateNoteDB(noteBehind._id, { zIndex: currentZindex })*/