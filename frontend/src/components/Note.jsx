import React, { useContext } from 'react'
import { HamburgerMenuIcon, Pencil2Icon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { Rnd as NoteDiv } from "react-rnd";
import NoteDialog from './NoteDialog';
import NoteDropdown from './NoteDropdown';
import { notesContext } from './Notes';
import { draggingContext } from '../App';
import { getStyles } from '../helperFuncs';
import { updateNoteDB } from '../api';

const Note = ({ note, search }) => {

    // get notes state context and dragging state context
    const { notes, setNotes } = useContext(notesContext);
    const { draggingDisabled, setDraggingDisabled } = useContext(draggingContext)

    // resize note --> update state and then save to DB
    const handleResize = (width, id) => {
        const updatedNotes = notes.map(note => note._id === id ? { ...note, size: [width, "auto"] } : note)
        setNotes(updatedNotes);
        updateNoteDB(id, { size: [width, "auto"] });
    }

    // drag note --> update state and then save to DB
    const handleDrag = (x, y, id) => {
        const updatedNotes = notes.map(note => note._id === id ? { ...note, position: [x, y] } : note)
        setNotes(updatedNotes);
        updateNoteDB(id, { position: [x, y] })
    }

    // compute note style --> depends on whether the note matches the user's search query
    const { noteStyle, noteTopStyle } = getStyles(notes, note, search);

    return (
        <NoteDiv
            style={noteStyle}
            disableDragging={draggingDisabled}
            minWidth={170}
            className='note'
            bounds={document.body}
            maxWidth={window.innerWidth - 40}
            size={{ width: note.size[0], height: note.size[1] }}
            position={{ x: note.position[0], y: note.position[1] }}
            onDragStop={(e, pos) => handleDrag(pos.x, pos.y, note._id)}
            onResizeStop={(e, direction, element) => handleResize(element.style.width, note._id)}>
            <div className="note-top" style={noteTopStyle}>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <HamburgerMenuIcon className='note-icon' />
                    </DropdownMenu.Trigger>
                    <NoteDropdown id={note._id} />
                </DropdownMenu.Root >
                <h2 className='note-title'>{note.heading}</h2>
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Pencil2Icon className='note-icon' onClick={() => setDraggingDisabled(true)} />
                    </Dialog.Trigger>
                    <NoteDialog newNote={false} note={note} notes={notes} setNotes={setNotes} />
                </Dialog.Root>
            </div>
            <div className="note-text-container">
                <p className='note-text'>{note.text}</p>
            </div>
        </NoteDiv >
    )
}

export default Note