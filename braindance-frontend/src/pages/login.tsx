import React, { useState, useEffect } from 'react';

import { type UserInfoType } from '../interface/user'

import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup, type UserCredential } from "firebase/auth"

import Button from '@mui/material/Button';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Login(props: {userUid: string, userToken: string, userImage: string
    sendUserToken: Function, sendUserUid: Function, sendRfToken: Function, sendUserImage: Function}){
    const navigate = useNavigate();

    var userUid: string = "";
    var userAccessToken: string = "";

    type userDataType = {displayName: string; email: string }; // TSX 문법
    const [userData, setUserData] = useState<userDataType | null>(null);

    function userSearch(){
        axios.get("http://localhost:3000/api/user/" + userUid, {
            headers: {
                Authorization: `Bearer ${userAccessToken}`
            }
        })
        .then(response => {
            console.log(response.data);
            // 성공적으로 API 요청을 보냈을 때 할 일
        })
        .catch(error => {
            console.error(error);
            // 에러 처리
        });
    }

    function handleGoogleLogin() {
        /*
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((data: UserCredential) => {
            userUid = data.user.uid;
            userAccessToken = data.user.accessToken;
            console.log(userAccessToken)

            axios.post("http://localhost:3000/api/user/", { uid: userUid }, {
                    headers: {
                        Authorization: `Bearer ${userAccessToken}`
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        // 성공적으로 API 요청을 보냈을 때 할 일
                    })
                    .catch(error => {
                        console.error(error);
                        // 에러 처리
                    });


            //axios.post("https://localhost:3000/api/user",
            //{"uid":userUid}, )
        })
        .catch((err) => {
            console.log(err);
        });
        */

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((data: UserCredential) => {
            props.sendRfToken(data);

            console.log(data)
            userUid = data.user.uid;
            props.sendUserImage(data.user.photoURL)
            // accessToken이 아니라 getIdToken() 메서드를 사용하여 토큰을 가져옵니다.
            data.user.getIdToken().then((idToken: string) => {
                userAccessToken = idToken;

                // 이제 userAccessToken으로 API 요청을 보냅니다.
                axios.post("http://localhost:3000/api/user/", { uid: userUid }, {
                    headers: {
                        Authorization: `Bearer ${userAccessToken}`
                    }
                })
                .then(response => {
                    props.sendUserToken(userAccessToken);
                    props.sendUserUid(userUid);
                    
                    // 성공적으로 API 요청을 보냈을 때 할 일
                    navigate("/viewer");
                })
                .catch(error => {
                    console.error(error);
                    // 에러 처리
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
    // console.log(JSON.stringify(userData, undefined, 4));

    return (
        <>

           <img style={{width: "35%"}} src="brain.png" />
           <h1 style={{fontWeight: "lighter"}}>브레인<b>댄스</b></h1>


           <h3>분산된 학습자료를 한번에 정리하자!</h3>

            <div>
              <p>
                {userData
                  ? "name : " + userData.displayName
                  + "\nemail : "+userData.email
                  : "지금 로그인하고 나만의 학습 비서를 찾으세요"}
              </p>
            </div>

            <Button 
            variant="contained"
            
            onClick={handleGoogleLogin}
            
            >Google로 로그인</Button>
        </>
    )
}

export default Login;