import React from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { text } from './newUserNotes';

const AboutDialog = () => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='overlay' style={{ opacity: '.5' }} />
            <Dialog.Content className='note-dialog note about-dialogue' style={{ padding: 0 }}>
                <div className='note-top' style={{ borderBottom: '.5px solid black', justifyContent: 'center' }}>
                    <h2 className='note-title'>About</h2>
                </div>
                <div className="note-text-container">
                    {text.map((text, idx) =>
                        <p key={idx} className='about-text-block'>{text}</p>
                    )}
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default AboutDialog