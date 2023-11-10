import axios, { AxiosRequestConfig } from 'axios'
import { GoogleAuthProvider, signInWithPopup, type UserCredential } from "firebase/auth"

import './App'

export const api = axios.create({
    baseURL:''
})

axios.interceptors.request.use((config: AxiosRequestConfig)=> {
    data.user.getIdToken().then((idToken: string) => {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
});