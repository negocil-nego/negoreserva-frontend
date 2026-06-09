import type { IOrgOrganizationUpdateDataService } from "../contract/organization-update-data.service";
import type { SendPhoneRequest } from "../model/organization-update-data.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface OrganizationSendMessagePhoneProps {
    service: IOrgOrganizationUpdateDataService;
}

export const useOrganizationSendMessagePhone = ({ service }: OrganizationSendMessagePhoneProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: SendPhoneRequest) => service.orgSendMessagePhone(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Mensagem enviada com sucesso");
            },
            onError: () => {
                toastError("Erro ao enviar mensagem");
            }
        }
    );
};
