import { useEffect, useState, createContext } from "react";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Notes from "./components/Notes";
import AddNewNote from "./components/AddNewNote";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";

export const draggingContext = createContext();

function App() {

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [draggingDisabled, setDraggingDisabled] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const timer = setTimeout(() => setIsLoading(true), 1000);
      try {
        const res = await fetch('https://float-note-api.onrender.com/api/notes');
        if (!res.ok) throw Error("There was an error retrieving your notes.")
        const json = await res.json();
        setNotes(json);
      } catch (err) {
        setError(err.message);
      } finally {
        clearTimeout(timer);
        setIsLoading(false);
      }
    }
    fetchNotes();
  }, [])

  return (
    <>
      <NavBar zIndex={notes.length + 1} />
      {isLoading && <LoadingScreen />}
      {error && <ErrorScreen error={error} />}
      <main>
        <draggingContext.Provider value={{ draggingDisabled, setDraggingDisabled }}>
          <AddNewNote notes={notes} setNotes={setNotes} />
          <Notes notes={notes} setNotes={setNotes} search={search} />
          <Search setSearch={setSearch} zIndex={notes.length + 1} />
        </draggingContext.Provider>
      </main>
    </>
  );
}

export default App;
