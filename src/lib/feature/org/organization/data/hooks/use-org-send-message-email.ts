import type { IOrgOrganizationUpdateDataService } from "../contract/organization-update-data.service";
import type { SendEmailRequest } from "../model/organization-update-data.model";
import { useMutation } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface OrgSendMessageEmailProps {
    service: IOrgOrganizationUpdateDataService;
}

export const useOrgSendMessageEmail = ({ service }: OrgSendMessageEmailProps) => {
    return useMutation(
        (request: SendEmailRequest) => service.orgSendMessageEmail(request),
        {
            onSuccess: () => {
                toastSuccess("Email enviado com sucesso");
            },
            onError: () => {
                toastError("Erro ao enviar email");
            }
        }
    );
};
