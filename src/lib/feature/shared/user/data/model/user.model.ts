export interface UserResponse {
    uuid: string
    name: string
    email: string
    phone: string
}

export interface UserEditProfileRequest {
    name?: string
}

export interface UserResetPasswordCurrentRequest {
    current: string
    password: string
    confirm: string
}