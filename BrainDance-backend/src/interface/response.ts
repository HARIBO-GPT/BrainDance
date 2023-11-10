export interface ApiResponse<T = any> {
    ok: boolean
    msg: string
    data?: T
}

export interface ResultSetHeader {
    fieldCount: number
    affectedRows: number
    insertId: number
    info: string
    serverStatus: number
    warningStatus: number
  }