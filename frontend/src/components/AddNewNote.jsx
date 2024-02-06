import React from 'react'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import * as Dialog from '@radix-ui/react-dialog';
import NoteDialog from './NoteDialog';

const AddNewNote = ({ notes, setNotes }) => {

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <PlusCircledIcon className='plus' />
            </Dialog.Trigger>
            <NoteDialog newNote={true} note={null} notes={notes} setNotes={setNotes} />
        </Dialog.Root>
    )
}

export default AddNewNote