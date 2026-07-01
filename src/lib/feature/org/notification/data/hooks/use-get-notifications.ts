import { useQuery } from "@sveltestack/svelte-query";
import type { BaseNotificationService } from "../contract/notification.service";
import type { NotificationFilterRequest } from "../model/notification.model";
import { PUB_NOTIFICATIONS } from "./keys";

interface Props {
    service: BaseNotificationService;
    filter: NotificationFilterRequest;
    enabled?: boolean;
}

export const useGetNotifications = ({ service, filter, enabled = true }: Props) => {
    return useQuery(
        [PUB_NOTIFICATIONS, filter],
        () => service.paginate(filter),
        { enabled }
    );
};
