import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import type { BaseNotificationService } from "../contract/notification.service";
import { PUB_NOTIFICATIONS } from "./keys";

interface Props {
    service: BaseNotificationService;
}

export const useMarkAllNotificationsAsRead = ({ service }: Props) => {
    const queryClient = useQueryClient();
    return useMutation(
        () => service.markAllAsRead(),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PUB_NOTIFICATIONS]);
            },
        },

    );
};
