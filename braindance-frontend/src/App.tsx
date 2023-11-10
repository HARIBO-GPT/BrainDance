import React, { useState, useEffect } from 'react';
import './App.css';

import { Routes, Route, Link } from 'react-router-dom';

import { auth } from "./firebase-config";
import { GoogleAuthProvider, signInWithPopup, type UserCredential } from "firebase/auth"

import axios, { AxiosRequestConfig } from 'axios'

import Login from './pages/login';
import Viewer from './pages/viewer';
import Append from './pages/append';
import Detail from './pages/detail';
import Quiz from './pages/quiz';

function App() {
  const [userToken, setUserToken] = useState("");
  const [userUid, setUserUid] = useState("");
  const [rfToken, setRfToken] = useState<UserCredential | null>();

  if(rfToken){
    rfToken.user.getIdToken().then((idToken: string) => {
        setUserToken(idToken);
    })
  }

  const sendUserToken = (str: string) => {
    setUserToken(str);
  }

  const sendUserUid = (str: string) => {
    setUserUid(str);
  }

  const sendRfToken = (str: string) => {
    setRfToken(str);
  }

  return (
    <>  
      <div className="App">
        <div className="Wrapper">
          <Routes>  
            <Route path="/login" element={ <Login userToken={userToken} userUid={userUid}
              sendUserToken= {sendUserToken} sendUserUid= {sendUserUid} sendRfToken={sendRfToken} />} />
            <Route path="/viewer" element={ <Viewer userToken={userToken} userUid={userUid}/> } />
            <Route path="/detail/:id" element={ <Detail /> } />
            <Route path="/append" element={ <Append userToken={userToken} userUid={userUid}/> } />
            <Route path="/squiz/:id" element={ <Quiz /> } />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
