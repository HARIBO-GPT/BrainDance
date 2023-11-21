import { type FieldPacket, type PoolConnection } from "mysql2/promise";
import { type UserRow } from "../interface/user";
import pool from '../config/database';

// const [user]: [UserRow[], FieldPacket[]] = await connection.execute('SELECT * FROM user WHERE uid = ?', [uid]);
export const selectUserRow = async (uid: string): Promise<UserRow[]> => {
    const connection: PoolConnection = await pool.getConnection();
    const [user]: [UserRow[], FieldPacket[]] = await connection.execute('SELECT * FROM user WHERE uid = ?', [uid]);
    connection.release();
    return user;
}

export const insertUserRow = async (uid: string): Promise<void> => {
    const connection: PoolConnection = await pool.getConnection();
    await connection.execute('INSERT INTO user (uid, createdAt) VALUES (?, NOW())',[uid]);
    connection.release();
}