import { FieldPacket, type PoolConnection } from "mysql2/promise";
import { QuizSelectObjectType, type QuizInsertObjectType } from "../interface/quiz";
import pool from '../config/database';

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

export const selectQuizRows = async (projectId: number): Promise<QuizSelectObjectType[]> => {
    try {
        const connection: PoolConnection = await pool.getConnection();
        const selectQuery: string = "SELECT quizQuestion, quizAnswer, quizComment, project_id FROM Quiz WHERE project_id = ?";
        const [quizRows]: [QuizSelectObjectType[], FieldPacket[]] = await connection.execute(selectQuery, [projectId]);
        connection.release();

        return quizRows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}