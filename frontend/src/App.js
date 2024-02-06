import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Notes from "./components/Notes";
import AddNewNote from "./components/AddNewNote";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";

function App() {

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchNotes = async () => {
      const timer = setTimeout(() => setIsLoading(true), 1000);
      try {
        const res = await fetch('http://localhost:4000/api/notes');
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
      <NavBar />
      {isLoading && <LoadingScreen />}
      {error && <ErrorScreen error={error} />}
      <main>
        <AddNewNote notes={notes} setNotes={setNotes} />
        <Notes notes={notes} setNotes={setNotes} search={search} />
        <Search setSearch={setSearch} />
      </main>
    </>
  );
}

export default App;
