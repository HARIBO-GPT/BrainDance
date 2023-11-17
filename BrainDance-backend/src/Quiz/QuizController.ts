import { type Response } from "express";
import { type UidRequest } from "../interface/user";
import { type ApiResponse } from "../interface/response";
import { type InputChatGPT, type GPTObjectType, type QuizInsertObjectType, type QuizSelectObjectType } from "../interface/quiz";
import { parsingData } from "../openAi/parsing";
import { insertQuiz, selectQuizs } from "../Quiz/QuizService";
import { admin } from "../auth/firebase";
import { chatGPT } from "../openAi/openAi";
import { updateProjectSummaryAndKeyword } from '../Project/ProjectRepository'

export const postQuiz = async (req: UidRequest, res: Response): Promise<void> => {
    try {
        console.time('postQuiz');
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
            
            let object: GPTObjectType = {
                summaryText: null,
                keyword: null,
                quiz: []
            }

            while (object.quiz.length === 0 || !(object.quiz[0].quizComment !== null)){
                const processedData: string = await chatGPT(passedData);
                object = await parsingData(processedData);
            }
            const responseData: GPTObjectType = {
                summaryText: object.summaryText,
                keyword: object.keyword,
                quiz: object.quiz
            }
            
            const response: ApiResponse = {
                ok: true,
                msg: "Successfully POST Quiz About Project",
                data: responseData
            }

            if (typeof responseData.summaryText === 'string' && typeof responseData.keyword === 'string'){
                const summaryText: string = responseData.summaryText;
                const keywords: string = responseData.keyword;
                const projectId: number = req.body.projectId;
                
                await updateProjectSummaryAndKeyword(summaryText,keywords,projectId);
                // if (responseData.keyword !== null){
                //     for (const keyword of responseData.keyword){
                //         await insertKeywordRow(projectId, keyword);
                //     }
                // }
            }

            if (responseData.quiz !== null){
                const quizArray: QuizInsertObjectType[] = []
                for (const quiz of responseData.quiz){
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
            console.log(response)
            console.timeEnd('postQuiz');
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
        console.time('getQuizs');
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
        console.timeEnd('getQuizs');
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