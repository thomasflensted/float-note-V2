// imports
import { forwardRef, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid';

// Components
import * as Dialog from '@radix-ui/react-dialog';
import ColorSelect from './ColorSelect';
import DialogTextForm from './DialogTextForm';
import DialogHeadingForm from './DialogHeadingForm';

// Functions
import { updateNoteDB, createNoteDB } from '../api';
import { calculateWidth, getRandomPosition } from '../helperFuncs';

// Contexts and hooks
import { draggingContext } from '../components/Home';
import { useNotesContext } from '../hooks/useNotesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const NoteDialog = forwardRef((props, ref) => {

    const { user } = useAuthContext();
    const { notes, dispatch } = useNotesContext();

    // get dragging context in order to disable dragging while note is being edited / created
    const setDraggingDisabled = useContext(draggingContext).setDraggingDisabled;

    // state --> if new note, set to empty string and color white, else set to current note's values
    const [newHeading, setNewHeading] = useState(props.newNote ? "" : props.note.heading);
    const [newText, setNewText] = useState(props.newNote ? "" : props.note.text);
    const [newColor, setNewColor] = useState(props.newNote ? "#FFFFFF" : props.note.color);

    // add new note --> create new note with values from form, then update DB first,
    // then set state. If state is set first mismatch arises because of lack of Mongo _id
    const handleAddNewNote = async () => {
        if (!newText && !newHeading) return;
        setDraggingDisabled(false);
        const width = calculateWidth(newText);
        const randomPosition = getRandomPosition(width, window);
        const newNote = {
            heading: newHeading,
            text: newText,
            size: [width, 'auto'],
            position: randomPosition,
            color: newColor,
            zIndex: notes.length + 1,
        };
        const newNoteCreated = user ? await createNoteDB(newNote, user) : { ...newNote, _id: uuid() };
        dispatch({ type: "ADD_NEW_NOTE", payload: newNoteCreated });
        reset();
    }

    // update note --> update state with new properties, then update DB
    const handleEditNote = () => {
        setDraggingDisabled(false);
        const updatedProps = { heading: newHeading, text: newText, color: newColor }
        dispatch({ type: "UPDATE_NOTE", payload: { id: props.note._id, updatedProps } })
        if (user) updateNoteDB(props.note._id, updatedProps, user);
    }

    const handleClose = () => {
        setDraggingDisabled(false)
        reset();
    }

    const reset = () => {
        setNewText('')
        setNewHeading('')
        setNewColor('#FFFFFF')
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='overlay' style={{ zIndex: notes.length + 2 }} />
            <Dialog.Content className='note center-note new-note-dialog' onInteractOutside={() => setDraggingDisabled(false)} style={{ zIndex: notes.length + 3 }}>
                <div className='note-top center-note-top' style={{ backgroundColor: props.newNote ? color : props.note.color }} >
                    <h2 className='note-title'>{props.newNote ? 'New Note' : 'Edit Note'}</h2>
                </div>
                <div className="note-text-container">
                    <form className='vertical-form'>
                        <DialogHeadingForm text={newHeading} setHeading={setNewHeading} />
                        <DialogTextForm text={newText} setText={setNewText} />
                        <ColorSelect color={newColor} setColor={setNewColor} />
                    </form>
                    <div className="buttons">
                        <Dialog.Close onClick={handleClose} className='btn btn-standard'>Cancel</Dialog.Close>
                        <Dialog.Close
                            className='btn btn-standard'
                            onClick={props.newNote ? handleAddNewNote : handleEditNote}>{props.newNote ? 'Add Note' : 'Save'}</Dialog.Close>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
})

export default NoteDialog;