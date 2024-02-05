import React, { forwardRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import ColorSelect from './ColorSelect';
import DialogTextForm from './DialogTextForm';
import DialogHeadingForm from './DialogHeadingForm';

const NoteDialog = forwardRef((props, ref) => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='overlay' />
            <Dialog.Content className='note-dialog'>
                <h2 className='new-note-title'>New Note</h2>
                <DialogHeadingForm />
                <DialogTextForm />
                <ColorSelect />
                <div className="buttons">
                    <Dialog.Close className='btn'>Cancel</Dialog.Close>
                    <Dialog.Close className='btn'>Add Note</Dialog.Close>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
})

export default NoteDialog;