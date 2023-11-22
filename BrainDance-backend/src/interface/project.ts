import { type RowDataPacket } from 'mysql2';

export interface PostProjectObjectType {
    uid: string
    projectTitle: string
    originText: string
}

export interface GetProjectsObjectType {
    projectId: number
    projectTitle: string
    createdAt: string
    keyword: string[]
    displayName: string
}

export interface ProjectSelectRow extends RowDataPacket {
    id: number
    projectTitle: string
    createdAt: string
    keywords: string
    videoUrls: string
    uid: string
}

export interface GetProjectInfoObjectType {
    projectId: number
    projectTitle: string
    createdAt: string
    originText: string
    summaryText: string
    keyword: string[]
    videoUrls: string[]
    displayName: string
}

export interface ProjectSelectWhereUidRow extends RowDataPacket {
    id: number
    projectTitle: string
    createdAt: string
    originText: string
    summaryText: string
    keywords: string
    uid: string
}