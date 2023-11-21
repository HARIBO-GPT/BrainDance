import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Viewer from './pages/Viewer';
import Append from './pages/Append';
import Detail from './pages/Detail';
import Quiz from './pages/Quiz';

import { useDispatch, useSelector } from "react-redux"
import { setUserUid, setUserToken, setProfileImage } from "./store"
import { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  let user = useSelector<RootState>((state) => state.user)
  
  if(user.userIdToken === ""){
    let cachedToken = localStorage.getItem('userIdToken');
    if(cachedToken != null){ dispatch(setUserToken(cachedToken)) }
    let cachedUid = localStorage.getItem('userUid');
    if(cachedUid != null){ dispatch(setUserUid(cachedUid)) }
    let cachedProfileImage = localStorage.getItem('userProfileImage');
    if(cachedProfileImage != null){ dispatch(setProfileImage(cachedProfileImage)) }
  }

            /*
            <Route path="/squiz/:id" element={ <Quiz userToken={userToken} userUid={userUid} /> } />
            */

  return (
    <>
      <div className="App">
        <div className="Wrapper" style={{height:"100vh", overflow:"hidden"}}>
          <Routes>
            <Route path="/login" element={ <Login /> } />
            <Route path="/viewer" element={ <Viewer /> } />
            <Route path="/detail/:id" element={ <Detail /> } />
            <Route path="/append" element={ <Append /> } />
            <Route path="*" element={
              (user.userIdToken === "") ? <Navigate to="/login" /> : <Navigate to="/viewer" /> } />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
