import { gql } from "@apollo/client/core";

export const PUB_NOTIFICATIONS = gql`
    query pubNotifications($filter: NotificationFilterRequest) {
        pubNotifications(filter: $filter) {
            content {
                uuid
                type
                message
                ready
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

export const PUB_MARK_NOTIFICATION_AS_READ = gql`
    mutation pubMarkNotificationAsRead($uuid: ID!) {
        pubMarkNotificationAsRead(uuid: $uuid)
    }
`;

export const PUB_MARK_ALL_NOTIFICATIONS_AS_READ = gql`
    mutation pubMarkAllNotificationsAsRead {
        pubMarkAllNotificationsAsRead
    }
`;
