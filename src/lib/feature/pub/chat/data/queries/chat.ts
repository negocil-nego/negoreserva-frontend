import { gql } from "@apollo/client/core";

export type { PaginateRequest, PageResponse } from "./types";

export const PUB_ORG_USERS = gql`
    query pubOrgUsers($slug: String!, $paginateRequest: PaginateRequest) {
        pubOrgUsers(slug: $slug, paginateRequest: $paginateRequest) {
            content {
                uuid
                name
                email
                phone
            }
            empty
            first
            last
            number
            numberOfElements
            size
            totalElements
            totalPages
        }
    }
`;

export const PUB_USER_CONVERSATIONS = gql`
    query pubUserConversations($orgSlug: String!, $userUuid: ID!, $paginateRequest: PaginateRequest) {
        pubUserConversations(orgSlug: $orgSlug, userUuid: $userUuid, paginateRequest: $paginateRequest) {
            content {
                uuid
                message
                senderName
                receptorName
                createdAt
            }
            empty
            first
            last
            number
            numberOfElements
            size
            totalElements
            totalPages
        }
    }
`;
