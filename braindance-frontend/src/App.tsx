import React, { useState, useEffect } from 'react';
import './App.css';

import { Routes, Route, Link } from 'react-router-dom';

import Login from './pages/login';
import Viewer from './pages/viewer';
import Append from './pages/append';
import Detail from './pages/detail';

import axios from 'axios';

function App() {
  return (
    <>  
      <div className="App">
        <div className="Wrapper">
          <Routes>  
            <Route path="/login" element={ Login() } />
            <Route path="/viewer" element={ Viewer() } />
            <Route path="/detail/:id" element={ Detail() } />
            <Route path="/append" element={ Append() } />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
