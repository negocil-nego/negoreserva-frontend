import type { IResetPasswordRepository } from "./reset-password.repository";
import type { UserForgetResetPasswordRequest, UserResetPasswordLoggedInput } from "../model/reset-password.model";

export abstract class IResetPasswordService {
    private repo: IResetPasswordRepository;

    constructor(repo: IResetPasswordRepository) {
        this.repo = repo;
    }

    async forgetResetPassword(request: UserForgetResetPasswordRequest): Promise<boolean> {
        return await this.repo.forgetResetPassword(request);
    }

    async resetPasswordLogged(request: UserResetPasswordLoggedInput): Promise<boolean> {
        return await this.repo.resetPasswordLogged(request);
    }
}
