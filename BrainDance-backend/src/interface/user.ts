import { type RowDataPacket } from 'mysql2';
import { type Request } from 'express';

export interface UidRequest extends Request  {
    uid?: string
}

export interface UserRow extends RowDataPacket {
    id: number
    uid: string
    createdAt: string
}

export interface UidToUserInfo {
    uid?: string
    email?: string
    displayName?: string
    photoURL?: string
  }