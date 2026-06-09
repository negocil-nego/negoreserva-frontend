import { apolloClient } from "$lib/providers/graphql.provider";
import { LOGIN } from "$lib/feature/pub/auth/login/data/queries/login";
import type { ILoginRepository } from "../contract/login.repository";
import type { LoginRequest, UserAuthResponse } from "../model/login.model";

export class LoginGqlRepository implements ILoginRepository {
    async login(request: LoginRequest): Promise<UserAuthResponse> {
        const { data } = await apolloClient.mutate<{ pubLogin: UserAuthResponse }>({
            mutation: LOGIN,
            variables: { request }
        });
        return data!.pubLogin;
    }
}
