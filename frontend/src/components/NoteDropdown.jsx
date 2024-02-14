import React, { forwardRef } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { createNoteDB, deleteNoteDB, getNotesDB, updateNoteDB, updateManyNotesDB } from '../api';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';


const NoteDropdown = forwardRef((props, ref) => {

    const { user } = useAuthContext();
    const { notes, dispatch } = useNotesContext();

    const handleDelete = async () => {
        if (!user) return;
        const noteZindex = notes.find(note => note._id === props.id).zIndex;
        dispatch({ type: "DELETE_NOTE", payload: props.id })
        deleteNoteDB(props.id, user);
        await updateManyNotesDB(noteZindex, true, user)
    }

    const handleDuplicate = async () => {
        if (!user) return;
        const thisNote = notes.find(note => note._id === props.id);
        const newNote = { ...thisNote, position: [thisNote.position[0] + 20, thisNote.position[1] + 20], zIndex: notes.length + 1 };
        const newNoteCreated = await createNoteDB(newNote, user);
        dispatch({ type: "DUPLICATE_NOTE", payload: newNoteCreated });
    }

    const handleSendBackward = () => {
        if (!user) return;
        dispatch({ type: "SEND_NOTE_BACKWARD", payload: props.id })
    }

    const handleBringForward = () => {
        if (!user) return;
        dispatch({ type: "BRING_NOTE_FORWARD", payload: props.id })
    }

    const handleBringToFront = async () => {
        if (!user) return;
        dispatch({ type: "BRING_NOTE_TO_FRONT", payload: props.id })
        const thisNote = notes.find(note => note._id === props.id);
        await updateManyNotesDB(thisNote.zIndex, true, user);
        updateNoteDB(thisNote._id, { zIndex: notes.length }, user);
    }

    const handleSendToback = async () => {
        if (!user) return;
        dispatch({ type: "SEND_NOTE_TO_BACK", payload: props.id })
        const thisNote = notes.find(note => note._id === props.id);
        await updateManyNotesDB(thisNote.zIndex, false, user);
        updateNoteDB(thisNote._id, { zIndex: 1 }, user);
    }

    return (
        <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5} style={{ zIndex: notes.length + 1 }}>
                <DropdownMenu.Arrow className="DropdownMenuArrow" />
                <DropdownMenu.Item onClick={handleBringForward} className="DropdownMenuItem">Bring Forward</DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleBringToFront} className="DropdownMenuItem">Bring To Front</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item onClick={handleSendBackward} className="DropdownMenuItem">Send Backward</DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleSendToback} className="DropdownMenuItem">Send To Back</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item onClick={handleDuplicate} className="DropdownMenuItem">Duplicate Note</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item onClick={handleDelete} className="DropdownMenuItem" style={{ color: "red" }}>Delete Note</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    )
})

export default NoteDropdown