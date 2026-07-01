import { useQuery } from "@sveltestack/svelte-query";
import { apolloClient } from "$lib/providers/graphql.provider";
import { PUB_ORG_USERS } from "$lib/feature/pub/chat/data/queries/chat";

export interface OrgUserSimpleResponse {
    uuid: string;
    name: string;
    email: string;
    phone: string;
}

export const useOrgListUsers = (slug: string, options?: { enabled?: boolean }) => {
    return useQuery<OrgUserSimpleResponse[]>(
        ["orgListUsers", slug],
        async () => {
            const { data } = await apolloClient.query<{ pubOrgUsers: OrgUserSimpleResponse[] }>({
                query: PUB_ORG_USERS,
                variables: { slug },
                fetchPolicy: "cache-first",
            });
            return data!.pubOrgUsers;
        },
        {
            refetchOnWindowFocus: false,
            enabled: options?.enabled,
        }
    );
};

