import type { IOrgOrganizationUpdateDataService } from "../contract/organization-update-data.service";
import type { SendPhoneRequest } from "../model/organization-update-data.model";
import { useMutation } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface OrgSendMessagePhoneProps {
    service: IOrgOrganizationUpdateDataService;
}

export const useOrgSendMessagePhone = ({ service }: OrgSendMessagePhoneProps) => {
    return useMutation(
        (request: SendPhoneRequest) => service.orgSendMessagePhone(request),
        {
            onSuccess: () => {
                toastSuccess("Mensagem enviada com sucesso");
            },
            onError: () => {
                toastError("Erro ao enviar mensagem");
            }
        }
    );
};
