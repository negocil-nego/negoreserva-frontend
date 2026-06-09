import type { ILogoutRepository } from "./logout.repository";

export class ILogoutService {
    private repo: ILogoutRepository;

    constructor(repo: ILogoutRepository) {
        this.repo = repo;
    }

    async logout(): Promise<boolean> {
        return await this.repo.logout();
    }
}
