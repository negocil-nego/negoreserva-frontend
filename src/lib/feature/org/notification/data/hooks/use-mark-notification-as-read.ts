import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import type { BaseNotificationService } from "../contract/notification.service";
import { PUB_NOTIFICATIONS } from "./keys";

interface Props {
    service: BaseNotificationService;
}

export const useMarkNotificationAsRead = ({ service }: Props) => {
    const queryClient = useQueryClient();
    return useMutation(
        (uuid: string) => service.markAsRead(uuid),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([PUB_NOTIFICATIONS]);
            },
        }
    );
};
