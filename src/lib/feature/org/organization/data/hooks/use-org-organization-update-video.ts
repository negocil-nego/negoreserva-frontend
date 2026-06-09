import type { IOrgOrganizationService } from "../contract/organization.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ORG_GET_ORGANIZATION_PROFILE } from "./keys";

interface OrgOrganizationUpdateVideoProps {
    service: IOrgOrganizationService;
}

export const useOrgOrganizationUpdateVideo = ({ service }: OrgOrganizationUpdateVideoProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (file: File) => service.orOrganizationUpdateVideo(file),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_GET_ORGANIZATION_PROFILE]);
                toastSuccess("Vídeo atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar vídeo");
            }
        }
    );
};
