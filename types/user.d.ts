export interface UserResponse {
    id: number
    username: string
    email: string
    full_name: string
    created_at: string
    updated_at: string
}

export interface UserCreateRequest {
    username: string
    email: string
    password: string
    password_confirmation: string
}