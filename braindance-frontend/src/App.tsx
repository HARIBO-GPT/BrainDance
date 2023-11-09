import React, { useState, useEffect } from 'react';
import './App.css';

import { Routes, Route, Link } from 'react-router-dom';

import Login from './login';
import Viewer from './viewer';

import axios from 'axios';


function App() {
  return (
    <>
      <div className="App">
        <div className="Wrapper">
          <Routes>  
            <Route path="/login" element={ Login() } />
            <Route path="/viewer" element={ Viewer() } />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
