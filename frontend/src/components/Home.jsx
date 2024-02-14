// imports
import React from 'react'
import { useEffect, useState, createContext } from "react";

// pages and components
import Search from "./Search"
import Notes from "./Notes";
import AddNewNote from "./AddNewNote";
import LoadingScreen from './LoadingScreen'
import ErrorScreen from './ErrorScreen'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';

// contexts
export const draggingContext = createContext();

const Home = () => {

    //const [notes, setNotes] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [draggingDisabled, setDraggingDisabled] = useState(false);
    const { user } = useAuthContext();
    const { dispatch } = useNotesContext()

    // fetch data from MongoDB
    useEffect(() => {
        const fetchNotes = async () => {
            const timer = setTimeout(() => setIsLoading(true), 500);
            try {
                const res = await fetch('http://localhost:4000/api/notes/', {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (!res.ok) throw Error("There was an error retrieving your notes.")
                const json = await res.json();
                dispatch({ type: "SET_NOTES", payload: json });
            } catch (err) {
                setError("There was an error retrieving your notes.");
            } finally {
                clearTimeout(timer);
                setIsLoading(false);
            }
        }
        if (user) fetchNotes();
    }, [user, dispatch])

    return (
        <>
            {isLoading && <LoadingScreen />}
            {error && <ErrorScreen error={error} />}
            {!error && !isLoading &&
                <draggingContext.Provider value={{ draggingDisabled, setDraggingDisabled }}>
                    <AddNewNote />
                    <Notes search={search} />
                    <Search setSearch={setSearch} />
                </draggingContext.Provider>
            }
        </>
    )
}

export default Home