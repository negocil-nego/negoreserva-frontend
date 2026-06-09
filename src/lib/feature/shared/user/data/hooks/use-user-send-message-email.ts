import type { IUserUpdateDataService } from "../contract/user-update-data.service";
import type { SendEmailRequest } from "../model/user-update-data.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "$lib/feature/org/organization/data/hooks/keys";

interface UserSendMessageEmailProps {
    service: IUserUpdateDataService;
}

export const useUserSendMessageEmail = ({ service }: UserSendMessageEmailProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: SendEmailRequest) => service.userSendMessageEmail(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [ORG_GET_ORGANIZATION_PROFILE] });
                toastSuccess("Email enviado com sucesso");
            },
            onError: () => {
                toastError("Erro ao enviar email");
            }
        }
    );
};
