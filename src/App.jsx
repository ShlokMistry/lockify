import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import ProfilePass from './components/ProfilePass';
import Add from './components/Add';
import View from './components/View';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter> 
      <AppContent /> 
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  
  const hideLayout = location.pathname === '/' || location.pathname === '/registration';

  return (
    <>
      <h1 className="project-title">Locify</h1>

      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profilepass/:wid/:uid" element={<ProfilePass />} />
        <Route path="/add" element={<Add />} />
        <Route path="/view/:wid/:uid" element={<View />} />
      </Routes>
      {!hideLayout && <Footer />} 
    </>
  );
}

export default App;