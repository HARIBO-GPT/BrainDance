import React, { useState, useEffect } from 'react';

import { type UserInfoType } from './interface/user'

import { auth } from "./firebase-config";
import { GoogleAuthProvider, signInWithPopup, type UserCredential } from "firebase/auth"

import Button from '@mui/material/Button';

import axios from 'axios';

function Login(){
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
        
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((data: UserCredential) => {
            console.log(data.user)
            

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
    }
    // console.log(JSON.stringify(userData, undefined, 4));

    return (
        <>
           <h1 style={{fontWeight:"100"}}>안녕하세요!</h1>

            <div>
              <p>
                {userData
                  ? "name : " + userData.displayName
                  + "\nemail : "+userData.email
                  : "로그인 버튼을 눌러주세요 :)"}
              </p>
            </div>

            <Button 
            variant="outlined"
            
            onClick={handleGoogleLogin}
            
            >Google로 로그인</Button>

            <Button
            variant="outlined"

            onClick={userSearch}
                
            >유저조회</Button>
        </>
    )
}

export default Login;