import { apolloClient } from "$lib/providers/graphql.provider";
import { SEND_FORGET_PASSWORD } from "$lib/feature/pub/auth/forget-password/data/queries/forget-password";
import type { IForgetPasswordRepository } from "../contract/forget-password.repository";
import type { UserForgetPasswordRequest } from "../model/forget-password.model";

export class ForgetPasswordGqlRepository implements IForgetPasswordRepository {
    async sendMessageForgetPassword(request: UserForgetPasswordRequest): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ pubSendMessageForgetPassword: boolean }>({
            mutation: SEND_FORGET_PASSWORD,
            variables: { request }
        });
        return data!.pubSendMessageForgetPassword;
    }
}
