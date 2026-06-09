import type { UserEditProfileRequest, UserResetPasswordCurrentRequest, UserResponse } from "$lib/feature/shared/user/data/model/user.model";
import type { IUserRepo } from "./user.repo";

export class IUserService {
    private repo: IUserRepo;

    constructor(repo: IUserRepo) {
        this.repo = repo;
    }

    async userUpdate(request: UserEditProfileRequest): Promise<UserResponse> {
        return await this.repo.userUpdate(request);
    }

    async updateLogoUser(file: File): Promise<UserResponse> {
        return await this.repo.updateLogoUser(file);
    }

    async userResetPasswordCurrent(request: UserResetPasswordCurrentRequest): Promise<UserResponse> {
        return await this.repo.userResetPasswordCurrent(request);
    }
}