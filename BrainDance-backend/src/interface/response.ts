export interface ApiResponse<T = any> {
    ok: boolean
    msg: string
    data?: T
}