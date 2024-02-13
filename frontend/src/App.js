// imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Login from './components/Login'
import Signup from './components/Signup'
import NavBar from "./components/NavBar";
import Home from "./components/Home";


// app
function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <header>
          <NavBar zIndex={10} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;