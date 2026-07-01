import { useQuery } from "@sveltestack/svelte-query";
import { apolloClient } from "$lib/providers/graphql.provider";
import { PUB_ORG_USERS } from "$lib/feature/pub/chat/data/queries/chat";
import type { PaginateRequest, PageResponse } from "$lib/feature/pub/chat/data/queries/types";

export interface OrgUserSimpleResponse {
    uuid: string;
    name: string;
    email: string;
    phone: string;
}

export const useOrgListUsers = (slug: string, paginateRequest?: PaginateRequest, options?: { enabled?: boolean }) => {
    return useQuery<PageResponse<OrgUserSimpleResponse>>(
        ["orgListUsers", slug, paginateRequest],
        async () => {
            const { data } = await apolloClient.query<{ pubOrgUsers: PageResponse<OrgUserSimpleResponse> }>({
                query: PUB_ORG_USERS,
                variables: { slug, paginateRequest: paginateRequest ?? { pageNumber: 0, pageSize: 50 } },
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
