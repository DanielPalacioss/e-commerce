export interface JwtPayload {
    sub: string
    exp: number
    authorities: string[]
    nbf: number,
    iss: string,
    userId: string,
    iat: number,
    jti: string
}