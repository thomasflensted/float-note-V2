// imports
import React from 'react'
import { useEffect, useState, createContext } from "react";

// pages and components
import Search from "./Search"
import Notes from "./Notes";
import AddNewNote from "./AddNewNote";
import LoadingScreen from './LoadingScreen'
import ErrorScreen from './ErrorScreen'

// contexts
export const draggingContext = createContext();

const Home = () => {

    // global states
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [draggingDisabled, setDraggingDisabled] = useState(false);

    // fetch data from MongoDB
    useEffect(() => {
        const fetchNotes = async () => {
            const timer = setTimeout(() => setIsLoading(true), 500);
            try {
                const res = await fetch('http://localhost:4000/api/notes/'); // update when deploying
                if (!res.ok) throw Error("There was an error retrieving your notes.")
                const json = await res.json();
                // await new Promise(resolve => setTimeout(resolve, 5000)); // imitate server lag
                setNotes(json);
            } catch (err) {
                setError("There was an error retrieving your notes.");
            } finally {
                clearTimeout(timer);
                setIsLoading(false);
            }
        }
        fetchNotes();
    }, [])

    return (
        <>
            {isLoading && <LoadingScreen />}
            {error && <ErrorScreen error={error} />}
            {!error && !isLoading &&
                <draggingContext.Provider value={{ draggingDisabled, setDraggingDisabled }}>
                    <AddNewNote notes={notes} setNotes={setNotes} />
                    <Notes notes={notes} setNotes={setNotes} search={search} />
                    <Search setSearch={setSearch} zIndex={notes.length + 1} />
                </draggingContext.Provider>
            }
        </>
    )
}

export default Home