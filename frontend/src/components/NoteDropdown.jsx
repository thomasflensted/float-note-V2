// imports
import { forwardRef } from 'react'
import { v4 as uuid } from 'uuid';

// components and functions
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { createNoteDB, deleteNoteDB, updateNoteDB, updateManyNotesDB } from '../api';

// contexts and hooks
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';

const NoteDropdown = forwardRef((props, ref) => {

    const { user } = useAuthContext();
    const { notes, dispatch } = useNotesContext();

    const getNoteAndZindexAndReorderValidity = (id, forward) => {
        const thisNote = notes.find(note => note._id === id);
        const thisZindex = thisNote.zIndex;
        const isValid = forward ? thisZindex !== notes.length : thisZindex !== 1;
        return { thisNote, thisZindex, isValid };
    }

    const handleDelete = async () => {
        const { thisNote, thisZindex } = getNoteAndZindexAndReorderValidity(props.id, false);
        dispatch({ type: "DELETE_NOTE", payload: thisNote._id })
        if (user) {
            deleteNoteDB(thisNote._id, user);
            await updateManyNotesDB(thisZindex, true, user)
        }
    }

    const handleDuplicate = async () => {
        const { thisNote } = getNoteAndZindexAndReorderValidity(props.id, true);
        const newNote = { ...thisNote, position: [thisNote.position[0] + 20, thisNote.position[1] + 20], zIndex: notes.length + 1 };
        const newNoteCreated = user ? await createNoteDB(newNote, user) : { ...newNote, _id: uuid() }
        dispatch({ type: "DUPLICATE_NOTE", payload: newNoteCreated });
    }

    const handleSendBackward = () => {
        const { thisNote, thisZindex, isValid } = getNoteAndZindexAndReorderValidity(props.id, false);
        if (!isValid) return;
        const noteBehind = notes.find(note => note.zIndex === thisZindex - 1);
        dispatch({ type: "SEND_NOTE_BACKWARD", payload: thisNote._id })
        if (user) {
            updateNoteDB(thisNote._id, { zIndex: noteBehind.zIndex }, user)
            updateNoteDB(noteBehind._id, { zIndex: thisZindex }, user);
        }
    }

    const handleBringForward = () => {
        const { thisNote, thisZindex, isValid } = getNoteAndZindexAndReorderValidity(props.id, true);
        if (!isValid) return;
        const noteInFront = notes.find(note => note.zIndex === thisZindex + 1);
        dispatch({ type: "BRING_NOTE_FORWARD", payload: thisNote._id })
        if (user) {
            updateNoteDB(thisNote._id, { zIndex: noteInFront.zIndex }, user)
            updateNoteDB(noteInFront._id, { zIndex: thisZindex }, user)
        }
    }

    const handleBringToFront = async () => {
        const { thisNote, thisZindex, isValid } = getNoteAndZindexAndReorderValidity(props.id, true)
        if (!isValid) return;
        dispatch({ type: "BRING_NOTE_TO_FRONT", payload: thisNote._id })
        if (user) {
            await updateManyNotesDB(thisZindex, true, user);
            updateNoteDB(thisNote._id, { zIndex: notes.length }, user);
        }
    }

    const handleSendToback = async () => {
        const { thisNote, thisZindex, isValid } = getNoteAndZindexAndReorderValidity(props.id, false)
        if (!isValid) return;
        dispatch({ type: "SEND_NOTE_TO_BACK", payload: thisNote._id })
        if (user) {
            await updateManyNotesDB(thisZindex, false, user);
            updateNoteDB(thisNote._id, { zIndex: 1 }, user);
        }
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