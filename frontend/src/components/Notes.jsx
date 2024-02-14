import React from 'react'
import Note from './Note'
import { useNotesContext } from '../hooks/useNotesContext';

const Notes = ({ search }) => {

    const { notes } = useNotesContext();

    return (
        notes.map(note =>
            <Note
                key={note._id}
                note={note}
                search={search}
            />)
    )
}

export default Notes