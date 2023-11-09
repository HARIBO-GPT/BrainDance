import { type PostProjectObjectType } from "../interface/project";
import { type FieldPacket, type PoolConnection } from "mysql2/promise";
import { type ResultSetHeader } from '../interface/response';
import pool from '../database/database';

export const insertProjectRow = async (data: PostProjectObjectType): Promise<number> => {
    try {
        const connection: PoolConnection = await pool.getConnection();
        const insertQuery: string = `
            INSERT INFO Project 
            (projectTitle, createdAt, originText, uid) 
            VALUES 
            (?, NOW(), ?, ?)`;
        const [ProjectRowInfo]: [any[], FieldPacket[]] = await connection.execute(insertQuery, [
            data.projectTitle,
            data.originText,
            data.uid]);
        connection.release();
        const insertId: number = (ProjectRowInfo as unknown as ResultSetHeader).insertId;
        return insertId;
    } catch(err) {
        console.log(err);
        throw err;
    }
}