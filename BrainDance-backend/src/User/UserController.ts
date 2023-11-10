import { admin } from "../auth/firebase";
import { type UidToUserInfo, type UserRow, type UidRequest } from "../interface/user";
import { type ApiResponse } from "../interface/response";
import { type Request, type Response } from 'express';
import { insertUser } from "./UserService";
import { selectUserRow } from "./UserRepository";

import { chatGPT } from '../openAi/openAi'

const script = `
4.1. if Statements
Perhaps the most well-known statement type is the if statement. For example:

>>>
x = int(input("Please enter an integer: "))
Please enter an integer: 42
if x < 0:
    x = 0
    print('Negative changed to zero')
elif x == 0:
    print('Zero')
elif x == 1:
    print('Single')
else:
    print('More')

More
There can be zero or more elif parts, and the else part is optional. The keyword ‘elif’ is short for ‘else if’, and is useful to avoid excessive indentation. An if … elif … elif … sequence is a substitute for the switch or case statements found in other languages.

If you’re comparing the same value to several constants, or checking for specific types or attributes, you may also find the match statement useful. For more details see match Statements.`


export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        if (typeof req.params.uid === 'string'){
            let userInfo: UidToUserInfo = {};
            try {
                userInfo = await admin.auth().getUser(req.params.uid);
              } catch (err) {
                const resData: ApiResponse = {
                  ok: false,
                  msg: '파이어베이스에 등록되지 않은 유저입니다.'
                };
        
                res.status(410).json(resData);
                return;
              }
            
            const existingUser: UserRow[] = await selectUserRow(req.params.uid);
        
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
        if (typeof req.body.uid === 'string'){
            const uid: string = req.body.uid;
            const userInfo = await admin.auth().getUser(uid);
            if (userInfo === undefined) {
              const resData: ApiResponse = {
                ok: false,
                msg: '파이어베이스에 등록되지 않은 유저입니다.'
              };
              res.status(410).json(resData);
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
                const data: string = await chatGPT(script);

                const response: ApiResponse = {
                    ok: false,
                    msg: "이미 유저 DB에 등록돼있습니다.",
                    data: data
                }
                res.status(413).json(response);
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