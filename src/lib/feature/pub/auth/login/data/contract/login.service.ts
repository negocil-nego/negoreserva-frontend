import type { ILoginRepository } from "./login.repository";
import type { LoginRequest, UserAuthResponse } from "../model/login.model";

export class ILoginService {
    private repo: ILoginRepository;

    constructor(repo: ILoginRepository) {
        this.repo = repo;
    }

    async login(request: LoginRequest): Promise<UserAuthResponse> {
        return await this.repo.login(request);
    }
}
