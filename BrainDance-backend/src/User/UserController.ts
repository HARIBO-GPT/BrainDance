import { admin } from "src/auth/firebase";
import { UserRow, type UidRequest } from "src/interface/user";
import { type ApiResponse } from "src/interface/response";
import { type Response } from 'express';
import { insertUser } from "./UserService";
import { selectUserRow } from "./UserRepository";

export const getUserInfo = async (req: UidRequest, res: Response): Promise<void> => {
    try {
        if (typeof req.uid === 'string'){
            const userInfo = await admin.auth().getUser(req.uid);
            if (userInfo === undefined) {
                const response: ApiResponse = {
                    ok: false,
                    msg: "파이어베이스에 등록되지 않은 유저입니다."
                };
                res.status(410).json(response);
                return;
            }
            const existingUser: UserRow[] = await selectUserRow(req.uid);
        
            if (existingUser.length === 0) {
                const response: ApiResponse = {
                    ok: false,
                    msg: "유저 테이블에 등록되지 않은 유저입니다."
                };
                res.status(411).json(response);
                return;
            }
            const response: ApiResponse = {
                ok: true,
                msg: "Successfully Get UserInfo",
                data: {
                    uid: userInfo.uid,
                    email: userInfo.email,
                    displayName: userInfo.displayName,
                    googleProfilePhotoUrl: userInfo.photoURL
                }
            }
            res.status(200).json(response);
            
        }
    }catch (err) {
        console.log(err);
        const response: ApiResponse = {
            ok: false,
            msg: "INTERNAL SERVER ERROR"
        }
        res.send(response);
        throw err;
    }
}

export const postUser = async (req: UidRequest, res: Response): Promise<void> => {
    try {
        if (typeof req.uid === 'string'){
            const uid: string = req.uid;
            const userInfo = await admin.auth().getUser(uid);
            console.log(userInfo);
            if (userInfo === undefined) {
              const resData: ApiResponse = {
                ok: false,
                msg: '파이어베이스에 등록되지 않은 유저입니다.'
              };
              res.status(400).json(resData);
              return;
            }
      
            const success: boolean = await insertUser(uid);
            
            if (success){
                const response: ApiResponse = {
                    ok: true,
                    msg: "Successfully Post!"
                }
                res.status(200).json(response);
                return;
            }
            else {
                const response: ApiResponse = {
                    ok: false,
                    msg: "already exist user"
                }
                res.status(410).json(response);
                return;
            }
            
        }
    }
    catch (err) {
        console.log(err);
        const response: ApiResponse = {
            ok: false,
            msg: "INTERNAL SERVER ERROR"
        }
        res.status(500).send(response);
        throw err;
    }
}