import type { UserForgetResetPasswordRequest, UserResetPasswordLoggedInput } from "../model/reset-password.model";

export interface IResetPasswordRepository {
    forgetResetPassword(request: UserForgetResetPasswordRequest): Promise<boolean>
    resetPasswordLogged(request: UserResetPasswordLoggedInput): Promise<boolean>
}
