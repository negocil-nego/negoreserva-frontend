import { apolloClient } from "$lib/providers/graphql.provider";
import type { ILogoutRepository } from "../contract/logout.repository";
import { LOGOUT } from "../queries/logaut";

export class LogoutGqlRepository implements ILogoutRepository {
    async logout(): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ pubLogout: boolean }>({
            mutation: LOGOUT
        });
        return !!data!.pubLogout;
    }
}
