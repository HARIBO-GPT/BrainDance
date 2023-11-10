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
  const [userToken, setUserToken] = useState("");
  const [userUid, setUserUid] = useState("");

  const sendUserToken = (str: string) => {
    setUserToken(str);
  }

  const sendUserUid = (str: string) => {
    setUserUid(str);
  }

  return (
    <>  
      <div className="App">
        <div className="Wrapper">
          <Routes>  
            <Route path="/login" element={ Login({userToken:userToken, userUid:userUid,
              sendUserToken: sendUserToken, sendUserUid: sendUserUid}) } />
            <Route path="/viewer" element={ Viewer({userToken:userToken, userUid:userUid}) } />
            <Route path="/detail/:id" element={ Detail() } />
            <Route path="/append" element={ Append({userToken:userToken, userUid:userUid}) } />
            <Route path="/squiz/:id" element={ Quiz() } />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
