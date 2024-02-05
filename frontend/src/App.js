import { useEffect, useState } from "react";

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
    <div>
      {isLoading && <h1>Your Notes Are Loading...</h1>}
      {error && <h1>{error}</h1>}
      {notes.map(note =>
        <li key={note._id}>
          <h1>{note.heading}</h1>
        </li>)}
    </div>
  );
}

export default App;
