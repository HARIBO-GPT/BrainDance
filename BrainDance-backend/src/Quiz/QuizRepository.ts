import { type PoolConnection } from "mysql2/promise";
import { type QuizInsertObjectType } from "../interface/quiz";
import pool from '../database/database';

export const insertQuizRow = async (quiz: QuizInsertObjectType): Promise<void> => {
    try{
        const connection: PoolConnection = await pool.getConnection();
        const insertQuery: string = `
            INSERT INTO Quiz 
            (quizQuestion, quizAnswer, quizComment, project_id) 
            VALUES 
            (?, ?, ?, ?)`;
        await connection.execute(insertQuery, [
            quiz.quizQuestion,
            quiz.quizAnswer,
            quiz.quizComment,
            quiz.projectId]);
        connection.release();
    } catch(err) {
        console.log(err);
        throw err;
    }
}