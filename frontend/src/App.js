// imports
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages and components
import Login from './components/Login'
import Signup from './components/Signup'
import NavBar from "./components/NavBar";
import Home from "./components/Home";

// Context and hooks
import { useNotesContext } from './hooks/useNotesContext';

// app
function App() {

  const { user } = useAuthContext();
  const { notes } = useNotesContext()

  return (
    <div className='app'>
      <BrowserRouter>
        <header>
          <NavBar zIndex={notes.length + 1} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;