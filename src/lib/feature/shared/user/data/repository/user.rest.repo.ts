import type { IUserRepo } from "../contract/user.repo";
import type { UserEditProfileRequest, UserResetPasswordCurrentRequest, UserResponse } from "$lib/feature/shared/user/data/model/user.model";
import { axiosClient } from "$lib/providers/http-cliente.provider";
import { UserRouteNamed } from "../queries/rest";
import { useUpdateLogoUser } from "../usecase/useUpdateLogoUser";

export class UserRestRepo implements IUserRepo {

    async userUpdate(request: UserEditProfileRequest): Promise<UserResponse> {
        const { data } = await axiosClient.post<UserResponse>(UserRouteNamed.PATH, request);
        return data;
    }

    async updateLogoUser(file: File): Promise<UserResponse> {
        return await useUpdateLogoUser(file);
    }

    async userResetPasswordCurrent(request: UserResetPasswordCurrentRequest): Promise<UserResponse> {
        const { data } = await axiosClient.post<UserResponse>(UserRouteNamed.RESET_PASSWORD_CURRENT, request);
        return data;
    }
}