import { gql } from "@apollo/client/core";

export const PUB_ORG_USERS = gql`
    query pubOrgUsers($slug: String!) {
        pubOrgUsers(slug: $slug) {
            uuid
            name
            email
            phone
        }
    }
`;

export const PUB_USER_CONVERSATIONS = gql`
    query pubUserConversations($orgSlug: String!, $userUuid: ID!) {
        pubUserConversations(orgSlug: $orgSlug, userUuid: $userUuid) {
            uuid
            emissorName
            createdAt
            messages {
                uuid
                message
                receptorName
                createdAt
            }
        }
    }
`;
