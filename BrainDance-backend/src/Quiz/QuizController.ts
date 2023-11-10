import { Response } from "express";
import { UidRequest } from "../interface/user";
import { ApiResponse } from "../interface/response";
import { admin } from "../auth/firebase";

export const postQuiz = async (req: UidRequest, res: Response): Promise<void> => {
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