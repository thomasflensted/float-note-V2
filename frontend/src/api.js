const baseURL = "https://float-note-api.onrender.com/api/notes/";

// get notes
export const getNotesDB = async () => {
    try {
        const response = await fetch(baseURL);
        if (!response) throw Error("There was an error updating the data.");
        const json = await response.json();
        return json;
    } catch (err) {
        console.log(err.message);
    }
}

// update existing note
export const updateNoteDB = async (id, updatedProps) => {
    try {
        const response = await fetch(`${baseURL}${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProps)
        })
        if (!response) throw Error("There was an error updating the data.");
    } catch (err) {
        console.log(err.message);
    }
}

export const updateMultiple = async (initialZvalue) => {
    try {
        const response = await fetch(`${baseURL}/?zvalue=${initialZvalue}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) throw Error("There was an error");
    } catch (err) {
        throw Error("There was an error.")
    }
}

// create new note / duplicate existing
export const createNoteDB = async (note) => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note)
        });
        if (!response.ok) throw Error("Something went wrong when creating the note.")
    } catch (err) {
        console.log(err.message);
    }
}

// delete note
export const deleteNoteDB = async (id) => {
    try {
        const response = await fetch(`${baseURL}${id}`, { method: 'DELETE' });
        if (!response) throw Error("There was an error deleting the data.");
    } catch (err) {
        console.log(err.message);
    }
}