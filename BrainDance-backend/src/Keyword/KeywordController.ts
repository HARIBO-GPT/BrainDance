import { type UidRequest, type UidToUserInfo } from '../interface/user';
import { type PostKeywordObjectType } from '../interface/keyword';
import { type ApiResponse } from '../interface/response';
import { type Response } from 'express';
import { insertKeyword } from '../Keyword/KeywordService';
import { admin } from "../auth/firebase";

export const postKeyword = async (req: UidRequest, res: Response): Promise<void> => {
    try {
        if (typeof req.uid === 'string'){
            const uid: string = req.uid;
            let userInfo: UidToUserInfo = {};
            console.log(uid);
            try {
                userInfo = await admin.auth().getUser(uid);
            } 
            catch (err) {
                const response: ApiResponse = {
                    ok: false,
                    msg: '파이어베이스에 등록되지 않은 유저입니다.'
                };
                res.status(410).json(response);
                return;
            }
            
            const passedData: PostKeywordObjectType = {
                projectId: req.body.projectId,
                keywords: req.body.keyword
            }

            await insertKeyword(passedData);

            const response: ApiResponse = {
                ok: true,
                msg: "Successfully POST Keyword About Project",
                data: {
                    projectId: passedData.projectId
                }
            };
            res.status(420).json(response)
        }
    } catch(err) {
        console.log(err);
        const response: ApiResponse = {
            ok: false,
            msg: "INTERNAL SERVER ERROR"
        }
        res.status(500).json(response);
        throw err;
    }
}