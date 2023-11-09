import { type RowDataPacket } from 'mysql2';

export interface PostKeywordObjectType {
    projectId: number
    keywords: string[]
}

export interface KeywordRow extends RowDataPacket {
    keyword: string
}