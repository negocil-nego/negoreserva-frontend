import { apolloClient } from "$lib/providers/graphql.provider";
import { PUB_ORG_USERS } from "$lib/feature/pub/chat/data/queries/chat";

export interface OrgUserSimpleResponse {
    uuid: string;
    name: string;
    email: string;
    phone: string;
}

export async function useOrgListUsers(slug: string): Promise<OrgUserSimpleResponse[]> {
    const { data } = await apolloClient.query<{ pubOrgUsers: OrgUserSimpleResponse[] }>({
        query: PUB_ORG_USERS,
        variables: { slug },
        fetchPolicy: "cache-first",
    });
    return data!.pubOrgUsers;
}
