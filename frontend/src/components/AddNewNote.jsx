import React from 'react'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import * as Dialog from '@radix-ui/react-dialog';
import NoteDialog from './NoteDialog';

const AddNewNote = () => {

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <PlusCircledIcon className='plus' />
            </Dialog.Trigger>
            <NoteDialog />
        </Dialog.Root>
    )
}

export default AddNewNote