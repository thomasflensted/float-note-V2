import React, { forwardRef, useContext } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { notesContext } from './Notes';
import { createNoteDB, deleteNoteDB, getNotesDB } from '../api';

const NoteDropdown = forwardRef((props, ref) => {

    // props: id
    const { notes, setNotes } = useContext(notesContext);

    const handleDelete = () => {
        const updatedNotes = notes.filter(note => note._id !== props.id);
        setNotes(updatedNotes);
        deleteNoteDB(props.id);
    }

    const handleDuplicate = async () => {
        const thisNote = notes.find(note => note._id === props.id);
        const newNote = {
            heading: thisNote.heading,
            text: thisNote.text,
            size: thisNote.size,
            position: [thisNote.position[0] + 20, thisNote.position[1] + 20],
            color: thisNote.color,
        }
        await createNoteDB(newNote);
        const updatedNotes = await getNotesDB();
        setNotes(updatedNotes);
    }

    return (
        <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5} >
                <DropdownMenu.Arrow className="DropdownMenuArrow" />
                <DropdownMenu.Item className="DropdownMenuItem">Bring Forward</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem">Bring To Front</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item className="DropdownMenuItem">Send Backward</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem">Send To Back</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item onClick={handleDuplicate} className="DropdownMenuItem">Duplicate Note</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item
                    className="DropdownMenuItem"
                    onClick={handleDelete}
                    style={{ color: "red" }}>Delete Note</DropdownMenu.Item>
            </DropdownMenu.Content >
        </DropdownMenu.Portal>
    )
})

export default NoteDropdown