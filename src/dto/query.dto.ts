export interface Sort {
    user?: {
        userName?: 'ASC' | 'DESC',
        email?: 'ASC' | 'DESC',
    }
    createDate?: 'ASC' | 'DESC' 
}

export class QueryDto {
    sort?: Sort
    page?: number
}