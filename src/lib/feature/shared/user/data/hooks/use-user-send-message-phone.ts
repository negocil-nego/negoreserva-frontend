import type { IUserUpdateDataService } from "../contract/user-update-data.service";
import type { SendPhoneRequest } from "../model/user-update-data.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "$lib/feature/org/organization/data/hooks/keys";

interface UserSendMessagePhoneProps {
    service: IUserUpdateDataService;
}

export const useUserSendMessagePhone = ({ service }: UserSendMessagePhoneProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: SendPhoneRequest) => service.userSendMessagePhone(request),
        {
            onSuccess: () => {
                toastSuccess("Mensagem enviada com sucesso");
                queryClient.invalidateQueries({ queryKey: [ORG_GET_ORGANIZATION_PROFILE] });
            },
            onError: () => {
                toastError("Erro ao enviar mensagem");
            }
        }
    );
};
