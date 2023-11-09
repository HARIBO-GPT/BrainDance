import { admin } from "../auth/firebase";
import { type ApiResponse } from "../interface/response";
import { type PostProjectObjectType } from "../interface/project";
import { type UidToUserInfo, type UidRequest } from "../interface/user";
import { type Response} from 'express';
import { insertProject } from '../Project/ProjectService';

export const postProject = async (req: UidRequest, res: Response): Promise<void> => {
    try {
        if (typeof req.uid === 'string'){
            const uid: string = req.uid;
            let userInfo: UidToUserInfo = {};

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

            if (typeof req.body.originText === 'string' && req.body.originText.length > 3000){
                const response: ApiResponse = {
                    ok: false,
                    msg: '원문 텍스트 길이 제한은 3000자 입니다.'
                };
                res.status(412).json(response);
                return;
            }

            const passedData: PostProjectObjectType = {
                uid: uid,
                projectTitle: req.body.projectTitle,
                originText: req.body.originText
            }

            const projectId: number = await insertProject(passedData);
            
            const response: ApiResponse = {
                ok: true,
                msg: 'Successfully POST PROJECT',
                data: {
                    projectId: projectId
                }
            };
            res.status(200).json(response);

        }
    } catch(err) {
        console.log(err);
        const response: ApiResponse = {
            ok: false,
            msg: "INTERNAL SERVER ERROR"
        }
        res.send(response);
        throw err;
    }
}