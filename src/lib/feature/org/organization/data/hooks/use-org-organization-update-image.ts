import type { IOrgOrganizationService } from "../contract/organization.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface OrgOrganizationUpdateImageProps {
    service: IOrgOrganizationService;
}

export const useOrgOrganizationUpdateImage = ({ service }: OrgOrganizationUpdateImageProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (file: File) => service.orOrganizationUpdateImage(file),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Imagem atualizada com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar imagem");
            }
        }
    );
};
