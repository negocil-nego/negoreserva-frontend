import { apolloClient } from "$lib/providers/graphql.provider";
import type { UserForgetResetPasswordRequest, UserResetPasswordLoggedInput } from "../model/reset-password.model";
import { SEND_FORGET_RESET_PASSWORD, SEND_RESET_PASSWORD_LOGGED } from "../queries/reset-password";
import type { IResetPasswordRepository } from "../contract/reset-password.repository";

export class ResetPasswordGqlRepository implements IResetPasswordRepository {
    async forgetResetPassword(request: UserForgetResetPasswordRequest): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ pubResetPassword: boolean }>({
            mutation: SEND_FORGET_RESET_PASSWORD,
            variables: { request }
        });
        return data!.pubResetPassword;
    }

    async resetPasswordLogged(request: UserResetPasswordLoggedInput): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ userResetPassword: boolean }>({
            mutation: SEND_RESET_PASSWORD_LOGGED,
            variables: { request }
        });
        return data!.userResetPassword;
    }
}
