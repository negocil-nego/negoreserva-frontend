import { apolloClient } from "$lib/providers/graphql.provider";
import { PUB_USER_CONVERSATIONS } from "$lib/feature/pub/chat/data/queries/chat";
import { useQuery } from "@sveltestack/svelte-query";
import type { OrgUserSimpleResponse } from "$lib/feature/org/organization/data/hooks/use-get-org-users";
import type { PageResponse, PaginateRequest } from "$lib/feature/pub/chat/data/queries/types";

export interface ChatMessageResponse {
    uuid: string;
    message: string;
    senderName: string;
    receptorName: string;
    createdAt: string;
}

async function fetchUserConversations(
    orgSlug: string,
    userUuid: string,
    paginateRequest?: PaginateRequest,
): Promise<PageResponse<ChatMessageResponse>> {
    const { data } = await apolloClient.query<{
        pubUserConversations: PageResponse<ChatMessageResponse>;
    }>({
        query: PUB_USER_CONVERSATIONS,
        variables: { orgSlug, userUuid, paginateRequest: paginateRequest ?? { pageNumber: 0, pageSize: 20 } },
        fetchPolicy: "network-only",
    });
    return data!.pubUserConversations;
}

export function useUserConversations(
    orgSlug: string,
    userReceptor: OrgUserSimpleResponse | null,
    paginateRequest?: PaginateRequest,
    options?: { enabled?: boolean },
) {
    return useQuery({
        queryKey: ["pubUserConversations", orgSlug, userReceptor?.uuid, paginateRequest],
        queryFn: () => fetchUserConversations(orgSlug, userReceptor?.uuid ?? '', paginateRequest),
        enabled: (options?.enabled ?? true) && !!orgSlug && !!userReceptor,
    });
}
