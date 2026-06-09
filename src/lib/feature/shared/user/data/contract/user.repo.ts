import type { UserEditProfileRequest, UserResetPasswordCurrentRequest, UserResponse } from "$lib/feature/shared/user/data/model/user.model";

export interface IUserRepo {
    userUpdate(request: UserEditProfileRequest): Promise<UserResponse>
    updateLogoUser(file: File): Promise<UserResponse>
    userResetPasswordCurrent(request: UserResetPasswordCurrentRequest): Promise<UserResponse>
}