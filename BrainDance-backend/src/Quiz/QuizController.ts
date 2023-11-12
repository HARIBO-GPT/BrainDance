import { type Response } from "express";
import { type UidRequest } from "../interface/user";
import { type ApiResponse } from "../interface/response";
import { type InputChatGPT, type GPTObjectType, QuizObjectType, QuizInsertObjectType, QuizSelectObjectType } from "../interface/quiz";
import { parsingData } from "../openAi/parsing";
import { insertQuiz, selectQuizs } from "../Quiz/QuizService";
import { admin } from "../auth/firebase";
import { chatGPT } from "../openAi/openAi";
import { updateProjectSummary } from '../Project/ProjectRepository'
import { insertKeywordRow } from "../Keyword/KeywordRepository";

export const postQuiz = async (req: UidRequest, res: Response): Promise<void> => {
    try {
        if (typeof req.uid === 'string'){
            const uid: string = req.uid;
            const userInfo = await admin.auth().getUser(uid);
            if (userInfo === undefined) {
              const resData: ApiResponse = {
                ok: false,
                msg: '파이어베이스에 등록되지 않은 유저입니다.'
              };
              res.status(410).json(resData);
              return;
            }
            console.log(req.body);
            const passedData: InputChatGPT = {
                userInput: req.body.quizRawScript,
                category: req.body.category
            }
            
            const processedData: string = await chatGPT(passedData);

            const object: GPTObjectType = await parsingData(processedData);
            console.log(object)
            const response: ApiResponse = {
                ok: true,
                msg: "Successfully POST Quiz About Project",
                data: object
            }

            if (typeof object.summaryText === 'string'){
                const summaryText: string = object.summaryText;
                const projectId: number = req.body.projectId;
                
                await updateProjectSummary(summaryText,projectId);
                if (object.keyword !== null){
                    for (const keyword of object.keyword){
                        await insertKeywordRow(projectId, keyword);
                    }
                }
            }

            

            if (object.quiz !== null){
                const quizArray: QuizInsertObjectType[] = []
                for (const quiz of object.quiz){
                    if (typeof quiz.quizQuestion === 'string' && typeof quiz.quizAnswer === 'string' && typeof quiz.quizComment === 'string'){
                        const item: QuizInsertObjectType = {
                            projectId: req.body.projectId,
                            quizQuestion: quiz.quizQuestion,
                            quizAnswer: quiz.quizAnswer,
                            quizComment: quiz.quizComment
                        }
                        quizArray.push(item);
                    }
                }
                await insertQuiz(quizArray);
            }

            res.status(200).json(response);

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

export const getQuizs = async (req: UidRequest, res: Response): Promise<void> => {
    try {
        if (typeof req.uid === 'string'){
            const uid: string = req.uid;
            const userInfo = await admin.auth().getUser(uid);
            if (userInfo === undefined) {
              const resData: ApiResponse = {
                ok: false,
                msg: '파이어베이스에 등록되지 않은 유저입니다.'
              };
              res.status(410).json(resData);
              return;
            }

        const projectId: number = parseInt(req.params.projectId, 10);

        const data: QuizSelectObjectType[] = await selectQuizs(projectId);
        
        const resData: ApiResponse = {
            ok: true,
            msg: '해당 프로젝트로 생성된 퀴즈 목록을 조회하였습니다.',
            data: data
          };

          res.status(200).json(resData);

        }
    } catch (err) {
        console.log(err);
        const response: ApiResponse = {
            ok: false,
            msg: "INTERNAL SERVER ERROR"
        }
        res.status(500).send(response);
        throw err;
    }
}