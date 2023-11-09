import { type FieldPacket, type PoolConnection } from "mysql2/promise";
import { type ResultSetHeader } from '../interface/response';
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