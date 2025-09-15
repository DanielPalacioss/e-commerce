export interface InvalidParam {
    name: string
    reason: string
}

export interface JsonProblem {
    type?: string
    title: string
    status: number
    detail: string
    instance: string
    timestamp?: string
    invalid_params?: InvalidParam[]
}