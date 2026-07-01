import type { INotificationRepo } from "./notification.repo";
import type { NotificationPaginate, NotificationFilterRequest } from "../model/notification.model";

export class BaseNotificationService {
    private repo: INotificationRepo;

    constructor(repo: INotificationRepo) {
        this.repo = repo;
    }

    async paginate(filter: NotificationFilterRequest): Promise<NotificationPaginate> {
        return await this.repo.paginate(filter);
    }

    async markAsRead(uuid: string): Promise<boolean> {
        return await this.repo.markAsRead(uuid);
    }

    async markAllAsRead(): Promise<boolean> {
        return await this.repo.markAllAsRead();
    }
}
