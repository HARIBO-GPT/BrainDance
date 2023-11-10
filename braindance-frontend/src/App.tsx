import React, { useState, useEffect } from 'react';
import './App.css';

import { Routes, Route, Link } from 'react-router-dom';

import Login from './pages/login';
import Viewer from './pages/viewer';
import Append from './pages/append';
import Detail from './pages/detail';
import Quiz from './pages/quiz';

import axios from 'axios';

function App() {
  var userToken = ""; var userUid = "";

  return (
    <>  
      <div className="App">
        <div className="Wrapper">
          <Routes>  
            <Route path="/login" element={ Login({userToken:userToken, userUid:userUid}) } />
            <Route path="/viewer" element={ Viewer() } />
            <Route path="/detail/:id" element={ Detail() } />
            <Route path="/append" element={ Append() } />
            <Route path="/squiz/:id" element={ Quiz() } />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
