import { apolloClient } from "$lib/providers/graphql.provider";
import type { IUserRepo } from "../contract/user.repo";
import type { UserEditProfileRequest, UserResetPasswordCurrentRequest, UserResponse } from "$lib/feature/shared/user/data/model/user.model";
import { UPDATE_USER, USER_RESET_PASSWORD_CURRENT, PROFILE_USER } from "../queries/graphql";
import { useUpdateLogoUser } from "../usecase/useUpdateLogoUser";

export class UserGqlRepo implements IUserRepo {
    async userUpdate(request: UserEditProfileRequest): Promise<UserResponse> {
        const { data } = await apolloClient.mutate<{ userUpdate: UserResponse }>({
            mutation: UPDATE_USER,
            variables: { request }
        });
        return data!.userUpdate;
    }

    async updateLogoUser(file: File): Promise<UserResponse> {
        return await useUpdateLogoUser(file);
    }

    async userResetPasswordCurrent(request: UserResetPasswordCurrentRequest): Promise<UserResponse> {
        const { data } = await apolloClient.mutate<{ userRestPassword: UserResponse }>({
            mutation: USER_RESET_PASSWORD_CURRENT,
            variables: { request }
        });
        return data!.userRestPassword;
    }

    async profileUser(): Promise<UserResponse> {
        const { data } = await apolloClient.query<{ profileUser: UserResponse }>({
            query: PROFILE_USER,
            fetchPolicy: "network-only"
        });
        return data!.profileUser;
    }
}