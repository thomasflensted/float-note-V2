import React from 'react'
import Note from './Note'

const Notes = ({ notes }) => {
    return (
        notes.map(note =>
            <Note
                key={note._id}
                note={note} />
        )
    )
}

export default Notes