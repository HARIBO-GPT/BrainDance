import { type QuizInsertObjectType } from "../interface/quiz";
import { insertQuizRow } from "./QuizRepository";

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