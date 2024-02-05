import React from 'react'
import { HamburgerMenuIcon, Pencil2Icon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { Rnd as NoteDiv } from "react-rnd";
import NoteDialog from './NoteDialog';
import NoteDropdown from './NoteDropdown';

const Note = ({ note }) => {

    const style = { border: ".5px solid black" };
    console.log(note.position);

    return (
        <NoteDiv
            style={style}
            minWidth={170}
            className='note'
            size={{ width: note.size[0], height: note.size[1] }}
            bounds={document.body}
            position={{ x: note.position[0], y: note.position[1] }}
            maxWidth={window.innerWidth - 40}>
            <div
                className="note-top"
                style={{ borderBottom: ".5px solid black" }}>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <HamburgerMenuIcon className='note-icon' />
                    </DropdownMenu.Trigger>
                    <NoteDropdown />
                </DropdownMenu.Root >
                <h2 className='note-title'>{note.heading}</h2>
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Pencil2Icon className='note-icon' />
                    </Dialog.Trigger>
                    <NoteDialog />
                </Dialog.Root>
            </div >
            <div className="note-text-container">
                <p className='note-text'>Lorem ipsum</p>
            </div>
        </NoteDiv >
    )
}

export default Note