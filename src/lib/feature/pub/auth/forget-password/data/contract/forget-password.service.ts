import type { IForgetPasswordRepository } from "./forget-password.repository";
import type { UserForgetPasswordRequest } from "../model/forget-password.model";

export class IForgetPasswordService {
    private repo: IForgetPasswordRepository;

    constructor(repo: IForgetPasswordRepository) {
        this.repo = repo;
    }

    async sendMessageForgetPassword(request: UserForgetPasswordRequest): Promise<boolean> {
        return await this.repo.sendMessageForgetPassword(request);
    }
}
