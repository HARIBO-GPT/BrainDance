import { type QuizInsertObjectType, type QuizSelectObjectType } from "../interface/quiz";
import { insertQuizRow, selectQuizRows } from "./QuizRepository";

export const insertQuiz = async (quizArray: QuizInsertObjectType[]): Promise<void> => {
    try {
        for (const quiz of quizArray){
            await insertQuizRow(quiz);
        }
    } catch(err) {
        console.log(err);
        throw err;
    }
}

export const selectQuizs = async (projectId: number): Promise<QuizSelectObjectType[]> => {
    try {
        const selectRows: QuizSelectObjectType[] = await selectQuizRows(projectId);
        return selectRows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}