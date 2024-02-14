// imports
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages and components
import Login from './components/Login'
import Signup from './components/Signup'
import NavBar from "./components/NavBar";
import Home from "./components/Home";

// app
function App() {

  const { user } = useAuthContext();

  return (
    <div className='app'>
      <BrowserRouter>
        <header>
          <NavBar zIndex={10} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;