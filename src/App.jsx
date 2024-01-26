import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import HomeAdmin from './components/pages/HomeAdmin';
import Chat from './components/pages/Chat';
import ChatFortnite from './components/pages/ChatFornite';
import Iniciar from './components/pages/Inicio';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatFortnite" element={<ChatFortnite />} />
        <Route path="/login" element={<Iniciar />} />
      </Routes>
    </Router>
  );
}

export default App;
