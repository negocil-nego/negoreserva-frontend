import { BaseNotificationService } from "../contract/notification.service";
import { NotificationGqlRepo } from "../repository/notification.gql.repo";

export class NotificationService extends BaseNotificationService {
    constructor() {
        super(new NotificationGqlRepo());
    }
}
