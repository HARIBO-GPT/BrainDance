import { RowDataPacket } from "mysql2/promise"

export interface InputChatGPT {
    userInput: string
    category: string
}

export interface GPTObjectType {
    summaryText: string | null
    keyword: string | null
    quiz: QuizObjectType[]
    youtubeUrls: string | null
}

export interface QuizObjectType {
    quizQuestion?: string | null
    quizAnswer?: string | null
    quizComment?: string | null
}

export interface QuizInsertObjectType {
    projectId: number
    quizQuestion: string
    quizAnswer: string
    quizComment: string
}

export interface QuizSelectObjectType extends RowDataPacket {
    projectId: number
    quizQuestion: string
    quizAnswer: string
    quizComment: string
}