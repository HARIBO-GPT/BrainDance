import { type FieldPacket, type PoolConnection } from "mysql2/promise";
import { type ResultSetHeader, type ApiResponse } from '../interface/response';
import { type KeywordRow } from '../interface/keyword';
import pool from '../database/database';

export const insertKeywordRow = async (projectId: number, keyword: string): Promise<void> => {
    try {
        const connection: PoolConnection = await pool.getConnection();
        const insertQuery: string = `
            INSERT INTO Keyword 
            (keyword, project_id) 
            VALUES 
            (?, ?)`;
        await connection.execute(insertQuery, [
            keyword,
            projectId
        ]);
        connection.release();
    } catch(err) {
        console.log(err);
        throw err;
    }
}

export const selectKeywordRows = async (projectId: number): Promise<string[]> => {
    try {
        const connection: PoolConnection = await pool.getConnection();
        const selectQuery: string = 'SELECT keyword FROM Keyword where project_id = ?';
        const [keywordRows]: [KeywordRow[], FieldPacket[]] = await connection.execute(selectQuery, [projectId]);
        connection.release();

        const response: string[] = [];
        for (const keywordRow of keywordRows){
            response.push(keywordRow.keyword);
        }

        return response;
        
    } catch(err) {
        console.log(err);
        throw err;
    }
}