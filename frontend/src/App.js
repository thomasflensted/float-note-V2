import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Notes from "./components/Notes";
import AddNewNote from "./components/AddNewNote";

function App() {

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const timer = setTimeout(() => setIsLoading(true), 500);
      try {
        const res = await fetch('http://localhost:4000/api/notes');
        if (!res.ok) throw Error("There was an error retrieving the data.")
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
      {isLoading && <h1>Your Notes Are Loading...</h1>}
      {error && <h1>{error}</h1>}
      <main>
        <AddNewNote />
        <Notes notes={notes} />
        <Search />
      </main>
    </>
  );
}

export default App;
