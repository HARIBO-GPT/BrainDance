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
  const [userImage, setUserImage] = useState("");

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

  const sendRfToken = (str : UserCredential) => {
    setRfToken(str);
  }

  const sendUserImage = (str: string) => {
    setUserImage(str);
  }

  return (
    <>  
      <div className="App">
        <div className="Wrapper">
          <Routes>  
            <Route path="/login" element={ <Login userToken={userToken} userUid={userUid} userImage={userImage}
              sendUserToken= {sendUserToken} sendUserUid= {sendUserUid} sendRfToken={sendRfToken} sendUserImage={sendUserImage} />} />
            <Route path="/viewer" element={ <Viewer userToken={userToken} userUid={userUid} userImage={userImage} /> } />
            <Route path="/detail/:id" element={ <Detail userToken={userToken} userUid={userUid} /> } />
            <Route path="/append" element={ <Append userToken={userToken} userUid={userUid} /> } />
            <Route path="/squiz/:id" element={ <Quiz userToken={userToken} userUid={userUid} /> } />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
