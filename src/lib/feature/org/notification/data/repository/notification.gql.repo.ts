import { apolloClient } from "$lib/providers/graphql.provider";
import type { INotificationRepo } from "../contract/notification.repo";
import type { NotificationPaginate, NotificationFilterRequest } from "../model/notification.model";
import {
    PUB_NOTIFICATIONS,
    PUB_MARK_NOTIFICATION_AS_READ,
    PUB_MARK_ALL_NOTIFICATIONS_AS_READ,
} from "../queries/notification";

export class NotificationGqlRepo implements INotificationRepo {
    async paginate(filter: NotificationFilterRequest): Promise<NotificationPaginate> {
        const { data } = await apolloClient.query<{ pubNotifications: NotificationPaginate }>({
            query: PUB_NOTIFICATIONS,
            variables: { filter },
            fetchPolicy: "network-only",
        });
        return data!.pubNotifications;
    }

    async markAsRead(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ pubMarkNotificationAsRead: boolean }>({
            mutation: PUB_MARK_NOTIFICATION_AS_READ,
            variables: { uuid },
        });
        return data!.pubMarkNotificationAsRead;
    }

    async markAllAsRead(): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ pubMarkAllNotificationsAsRead: boolean }>({
            mutation: PUB_MARK_ALL_NOTIFICATIONS_AS_READ,
        });
        return data!.pubMarkAllNotificationsAsRead;
    }
}
