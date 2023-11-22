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
            <img src="background.jpg" style={{width:"50vh", borderRadius: "50px"}} />
            
            <div style={{display:"flex", justifyContent: "center", alignItems: "center", margin: "0 auto"}}>
                <h1 style={{color: "#FAFAFA", fontWeight: "lighter", paddingRight: "12px"}}>Start your</h1>
                <h1 style={{color: "#FAFAFA"}}>BrainDance</h1>
            </div>

            <div style={{display:"flex", justifyContent: "center", alignItems: "center", margin: "0 auto"}}>
                <img src="paper.png" style={{width:"30px", paddingRight: "12px"}} />
                <p style={{color:"white"}}>복잡한 학습자료를 하나의 문서로 요약해요</p>
            </div>

            <div style={{display:"flex", justifyContent: "center", alignItems: "center", margin: "0 auto"}}>
                <img src="idea.png" style={{width:"30px", paddingRight: "12px"}} />
                <p style={{color:"white"}}>퀴즈, 영상 등 컨텐츠가 자동으로 추가돼요</p>
            </div>

            <br/>
            <p style={{color: "white", fontWeight: "bold"}}>지금 시작하면 완벽할 것 같아요! 🚀</p>
            <Button variant="contained" style={{width:"30vh", height:"5vh", fontSize:"17px", fontWeight:"bold", borderRadius: "15px"}}
            onClick={handleGoogleLogin}
            >Google로 로그인</Button>
        </>
    )
}

export default Login;