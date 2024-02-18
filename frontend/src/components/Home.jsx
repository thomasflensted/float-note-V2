// imports
import { useEffect, useState, createContext } from "react";

// pages and components
import Search from "./Search"
import Notes from "./Notes";
import AddNewNote from "./AddNewNote";
import LoadingScreen from './LoadingScreen'
import ErrorScreen from './ErrorScreen'

// contexts
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';
import { newUserNotes } from "./newUserNotes";
export const draggingContext = createContext();

const Home = () => {

    // state and contexts
    const [error, setError] = useState('');
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [draggingDisabled, setDraggingDisabled] = useState(false);
    const { user } = useAuthContext();
    const { notes, dispatch } = useNotesContext();

    // fetch data from MongoDB
    useEffect(() => {

        const fetchNotes = async () => {
            const timer = setTimeout(() => setIsLoading(true), 350);
            try {
                const res = await fetch('https://float-note-api.onrender.com/api/notes', {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (!res.ok) throw Error("There was an error retrieving your notes.")
                const notes = await res.json();
                dispatch({ type: "SET_NOTES", payload: notes });
            } catch (err) {
                setError("There was an error retrieving your notes.");
            } finally {
                clearTimeout(timer);
                setIsLoading(false);
            }
        }
        const visitedBefore = localStorage.getItem("visitedBefore");
        if (user) {
            localStorage.setItem("visitedBefore", 1);
            fetchNotes()
        } else if (!user && !visitedBefore) {
            let localNotes = JSON.parse(localStorage.getItem("notes"));
            localNotes = !localNotes || localNotes.length === 0 ? newUserNotes : localNotes;
            dispatch({ type: "SET_NOTES", payload: localNotes });
        }
    }, [user, dispatch])

    useEffect(() => {
        if (!user) localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes, user])

    return (
        <>
            {isLoading && <LoadingScreen />}
            {error && <ErrorScreen error={error} />}
            {!isLoading && !error &&
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