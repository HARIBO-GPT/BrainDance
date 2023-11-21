import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

import Button from '@mui/material/Button';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from "react-redux"
import { setUserUid, setUserToken, setProfileImage } from "../store"


function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleGoogleLogin() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            localStorage.clear();
            
            const user = result.user;
            const userUid = user.uid;
            const userProfileImage = user.photoURL;
            
            localStorage.setItem('userUid', userUid);
            if(userProfileImage != null){ localStorage.setItem('userProfileImage', userProfileImage); }

            user.getIdToken(true).then((idToken: string) => {
                localStorage.setItem('userIdToken', idToken);

                axios.post("http://localhost:3000/api/user/", { uid: userUid }, {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                })
                .then(() => {
                    dispatch(setUserToken(idToken));
                    dispatch(setUserUid(userUid));
                    dispatch(setProfileImage(userProfileImage));

                    navigate("/viewer");
                })
                .catch(error => {
                    console.error(error);
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
           <img style={{width: "35%"}} src="brain.png" />
           <h1 style={{fontWeight: "lighter"}}>브레인<b>댄스</b></h1>


           <h3>분산된 학습자료를 한번에 정리하자!</h3>

            <div>
              <p>"지금 로그인하고 나만의 학습 비서를 찾으세요"</p>
            </div>

            <Button 
            variant="contained"
            
            onClick={handleGoogleLogin}
            
            >Google로 로그인</Button>
        </>
    )
}

export default Login;