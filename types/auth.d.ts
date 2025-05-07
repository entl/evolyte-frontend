export interface LoginRequest {
    email: string
    password: string
}
  
export interface LoginResponse {
    access_token: string
    token_type: string
}
  
export interface RefreshTokenResponse {
    access_token: string
    token_type: string
}

export interface JwtPayload {
    exp: number
    user_id: number
}