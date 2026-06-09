import type { IOrgOrganizationUpdateDataService } from "../contract/organization-update-data.service";
import type { SendEmailRequest } from "../model/organization-update-data.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface OrganizationSendMessageEmailProps {
    service: IOrgOrganizationUpdateDataService;
}

export const useOrganizationSendMessageEmail = ({ service }: OrganizationSendMessageEmailProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: SendEmailRequest) => service.orgSendMessageEmail(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Email enviado com sucesso");
            },
            onError: () => {
                toastError("Erro ao enviar email");
            }
        }
    );
};
