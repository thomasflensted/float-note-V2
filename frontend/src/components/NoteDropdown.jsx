import React, { forwardRef, useContext } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { notesContext } from './Notes';
import { sendNoteToFrontOrBack } from '../helperFuncs';
import { createNoteDB, deleteNoteDB, getNotesDB, updateNoteDB, updateZindecesDB } from '../api';

const NoteDropdown = forwardRef((props, ref) => {

    const { notes, setNotes } = useContext(notesContext);

    const handleDelete = () => {
        const updatedNotes = notes.filter(note => note._id !== props.id);
        const noteZindex = notes.find(note => note._id === props.id).zIndex;
        console.log(noteZindex);
        setNotes(updatedNotes);
        deleteNoteDB(props.id);
        updateZindecesDB(noteZindex);
    }

    const handleDuplicate = async () => {
        const thisNote = notes.find(note => note._id === props.id);
        const newNote = {
            heading: thisNote.heading,
            text: thisNote.text,
            size: thisNote.size,
            position: [thisNote.position[0] + 20, thisNote.position[1] + 20],
            color: thisNote.color,
            zIndex: notes.length + 1,
        }
        await createNoteDB(newNote);
        const updatedNotes = await getNotesDB();
        setNotes(updatedNotes);
    }

    const handleReorderNotes = (toFront) => {
        const reorderedNotes = sendNoteToFrontOrBack(props.id, notes, toFront)
        for (let i = 0; i < reorderedNotes.length; i++) {
            reorderedNotes[i].zIndex = i + 1;
            updateNoteDB(reorderedNotes[i]._id, { zIndex: i + 1 });
        };
        setNotes(reorderedNotes);
    }

    const handleBringForward = () => {
        const currentZindex = notes.find(note => note._id === props.id).zIndex;
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
        updateNoteDB(props.id, { zIndex: currentZindex + 1 })
        updateNoteDB(noteBehind, { zIndex: currentZindex })
    }

    const handleSendBackward = () => {
        const currentZindex = notes.find(note => note._id === props.id).zIndex;
        if (currentZindex === 1) return;
        var noteInFront = '';
        const updatedNotes = notes.map(note => {
            if (note._id === props.id) {
                return { ...note, zIndex: note.zIndex - 1 };
            } else if (note.zIndex === currentZindex - 1) {
                noteInFront = note._id;
                return { ...note, zIndex: currentZindex };
            } return note;
        })
        setNotes(updatedNotes);
        updateNoteDB(props.id, { zIndex: currentZindex - 1 })
        updateNoteDB(noteInFront, { zIndex: currentZindex })
    }

    return (
        <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5} style={{ zIndex: notes.length + 1 }}>
                <DropdownMenu.Arrow className="DropdownMenuArrow" />
                <DropdownMenu.Item onClick={handleBringForward} className="DropdownMenuItem">Bring Forward</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => handleReorderNotes(true)} className="DropdownMenuItem">Bring To Front</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item onClick={handleSendBackward} className="DropdownMenuItem">Send Backward</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => handleReorderNotes(false)} className="DropdownMenuItem">Send To Back</DropdownMenu.Item>
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