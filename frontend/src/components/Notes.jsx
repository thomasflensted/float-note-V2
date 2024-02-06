import React, { createContext } from 'react'
import Note from './Note'

export const notesContext = createContext();

const Notes = ({ notes, setNotes, search }) => {

    return (
        <notesContext.Provider value={{ notes, setNotes }}>
            {notes.map(note =>
                <Note
                    key={note._id}
                    note={note}
                    search={search}
                />
            )}
        </notesContext.Provider>
    )
}

export default Notes