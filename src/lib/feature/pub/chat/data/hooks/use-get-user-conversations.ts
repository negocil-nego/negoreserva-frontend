import { apolloClient } from "$lib/providers/graphql.provider";
import { PUB_USER_CONVERSATIONS } from "$lib/feature/pub/chat/data/queries/chat";

export interface ChatMessageResponse {
    uuid: string;
    message: string;
    receptorName: string;
    createdAt: string;
}

export interface ChatConversationWithMessages {
    uuid: string;
    emissorName: string;
    createdAt: string;
    messages: ChatMessageResponse[];
}

export async function useUserConversations(
    orgSlug: string,
    userUuid: string,
): Promise<ChatConversationWithMessages[]> {
    const { data } = await apolloClient.query<{
        pubUserConversations: ChatConversationWithMessages[];
    }>({
        query: PUB_USER_CONVERSATIONS,
        variables: { orgSlug, userUuid },
        fetchPolicy: "network-only",
    });
    return data!.pubUserConversations;
}
