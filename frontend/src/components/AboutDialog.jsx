import React from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { aboutText } from './stringConstants';
import { useNotesContext } from '../hooks/useNotesContext';
import { IoIosClose } from "react-icons/io";

const AboutDialog = () => {
    const { notes } = useNotesContext();
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='overlay' style={{ zIndex: notes.length + 2 }} />
            <Dialog.Content className='center-note note about-dialog' style={{ zIndex: notes.length + 3 }}>
                <div className='note-top gray about-top'>
                    <h2 className='about-title'>About</h2>
                    <Dialog.Close asChild>
                        <IoIosClose className='about-title about-close' />
                    </Dialog.Close>
                </div>
                <div className='note-text-container about-text-container'>
                    {aboutText.map((text) =>
                        <div key={text.heading}>
                            <h3 className='about-heading'>{text.heading}</h3>
                            <p>{text.text}</p>
                        </div>
                    )}
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default AboutDialog

/*
<div className='note-top' style={{ borderBottom: '.5px solid black', justifyContent: 'center' }}>
                    <h2 className='note-title'>About</h2>
                </div>
                <div className="note-text-container">
                    {aboutText.map((text, idx) =>
                        <p key={idx} className='about-text-block'>{text}</p>
                    )}
                </div>
                */