export interface UserForgetResetPasswordRequest {
    code: string;
    password: string;
    confirm: string;
}

export interface UserResetPasswordLoggedInput {
    currentPassword: string;
    confirmPassword: string;
    newPassword: string;
}

export interface ResetPasswordResponse {
    status: boolean;
}
