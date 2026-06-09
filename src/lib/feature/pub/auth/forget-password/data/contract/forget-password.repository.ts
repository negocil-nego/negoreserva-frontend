import type { UserForgetPasswordRequest } from "../model/forget-password.model";

export interface IForgetPasswordRepository {
    sendMessageForgetPassword(request: UserForgetPasswordRequest): Promise<boolean>
}
