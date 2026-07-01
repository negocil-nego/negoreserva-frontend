import type { NotificationPaginate, NotificationFilterRequest } from "../model/notification.model";

export interface INotificationRepo {
    paginate(filter: NotificationFilterRequest): Promise<NotificationPaginate>;
    markAsRead(uuid: string): Promise<boolean>;
    markAllAsRead(): Promise<boolean>;
}
