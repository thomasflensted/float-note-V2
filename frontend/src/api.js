import { NOTES_URL } from "./urls";

// get notes
export const getNotesDB = async (user) => {
    if (!user) return;
    try {
        const response = await fetch(NOTES_URL, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (!response) throw Error("There was an error updating the data.");
        const json = await response.json();
        return json;
    } catch (err) {
        console.log(err.message);
    }
}

// update existing note
export const updateNoteDB = async (id, updatedProps, user) => {
    if (!user) return;
    try {
        const response = await fetch(`${NOTES_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedProps)
        })
        if (!response) throw Error("There was an error updating the data.");
    } catch (err) {
        console.log(err.message);
    }
}

export const updateManyNotesDB = async (zValue, forward, user) => {
    if (!user) return;
    try {
        const response = await fetch(NOTES_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ zValue, forward })
        })
        if (!response) throw Error("There was an error on the server.")
    } catch (err) {
        console.log(err.message);
    }
}

// create new note / duplicate existing
export const createNoteDB = async (note, user) => {
    if (!user) return;
    try {
        const response = await fetch(NOTES_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(note)
        });
        if (!response.ok) throw Error("Something went wrong when creating the note.")
        return response.json();
    } catch (err) {
        console.log(err.message);
    }
}

// delete note
export const deleteNoteDB = async (id, user) => {
    if (!user) return;
    try {
        const response = await fetch(`${NOTES_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        if (!response) throw Error("There was an error deleting the data.");
    } catch (err) {
        console.log(err.message);
    }
}

export const deleteNotesDB = async (user) => {
    if (!user) return;
    try {
        const response = await fetch(`${NOTES_URL}/user/${user.user_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        if (!response) throw Error("There was an error deleting the data.");
    } catch (err) {
        console.log(err.message);
    }
}