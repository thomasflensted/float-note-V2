import { createContext, useReducer } from "react";

export const NotesContext = createContext();

export const notesReducer = (state, action) => {

    let updatedNotes, thisNote, noteToMoveZindex;

    switch (action.type) {

        case "SET_NOTES":
            return { notes: action.payload }

        case "DUPLICATE_NOTE":
        case "ADD_NEW_NOTE": // payload: new note object
            return { notes: [...state.notes, action.payload] };

        case "DELETE_NOTE": // payload: id of note to be deleted
            const noteToDeleteZindex = state.notes.find(note => note._id === action.payload).zIndex;
            updatedNotes = state.notes
                .filter(note => // filter out the deleted note
                    note._id !== action.payload)
                .map(note => // decrement z-indices of notes ahead of the deleted note by one (to keep z-indices consecutive, starting from 1)
                    note.zIndex > noteToDeleteZindex ? { ...note, zIndex: note.zIndex - 1 } : note)
            return { notes: updatedNotes };

        case "UPDATE_NOTE": // payload: { id, {updatedProps} }
            const { id, updatedProps } = action.payload;
            updatedNotes = state.notes.map(note =>
                note._id === id ? { ...note, ...updatedProps } : note
            )
            return { notes: updatedNotes }

        // check if note is already in front before calling
        case "BRING_NOTE_FORWARD": // payload: id of note
            thisNote = state.notes.find(note => note._id === action.payload);
            updatedNotes = state.notes.map(note => {
                if (note._id === thisNote._id) return { ...note, zIndex: note.zIndex + 1 }
                if (note.zIndex === thisNote.zIndex + 1) return { ...note, zIndex: note.zIndex - 1 }
                return note;
            })
            return { notes: updatedNotes };

        // check if note is already in back before calling
        case "SEND_NOTE_BACKWARD": // payload: id of note to be send backward
            thisNote = state.notes.find(note => note._id === action.payload);
            updatedNotes = state.notes.map(note => {
                if (note._id === thisNote._id) return { ...note, zIndex: note.zIndex - 1 }
                if (note.zIndex === thisNote.zIndex - 1) return { ...note, zIndex: note.zIndex + 1 }
                return note;
            })
            return { notes: updatedNotes };

        // check if note is already in front before calling
        case "BRING_NOTE_TO_FRONT": // payload: id of note to be moved forward
            noteToMoveZindex = state.notes.find(note => note._id === action.payload).zIndex;
            updatedNotes = state.notes
                .map(note => {
                    if (note._id === action.payload) return { ...note, zIndex: state.notes.length }
                    if (note.zIndex > noteToMoveZindex) return { ...note, zIndex: note.zIndex - 1 }
                    return note;
                })
            return { notes: updatedNotes };

        // check if note is already in back before calling
        case "SEND_NOTE_TO_BACK": // payload: id of note to be send backward
            noteToMoveZindex = state.notes.find(note => note._id === action.payload).zIndex;
            updatedNotes = state.notes
                .map(note => {
                    if (note._id === action.payload) return { ...note, zIndex: 1 }
                    if (note.zIndex < noteToMoveZindex) return { ...note, zIndex: note.zIndex + 1 }
                    return note;
                })
            return { notes: updatedNotes };

        default:
            return { notes: state.notes }
    }
}

export const NotesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notesReducer, {
        notes: []
    });

    return (
        <NotesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </NotesContext.Provider>
    )
}