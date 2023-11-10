import { type RowDataPacket } from 'mysql2';

export interface PostProjectObjectType {
    uid: string
    projectTitle: string
    originText: string
    summaryText: string
}

export interface GetProjectsObjectType {
    projectId: number
    projectTitle: string
    createdAt: string
    keyword: string[] // projectId
    displayName: string // uid -> project -> another uid
}

export interface ProjectSelectRow extends RowDataPacket {
    id: number
    projectTitle: string
    createdAt: string
    uid: string
}