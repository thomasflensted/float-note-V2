import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { NotesContextProvider } from './context/NotesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <NotesContextProvider>
      <App />
    </NotesContextProvider>
  </AuthContextProvider>
);