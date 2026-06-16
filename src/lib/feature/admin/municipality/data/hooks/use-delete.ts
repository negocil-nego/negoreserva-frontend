import type { IAdminMunicipalityService } from "../contract/municipality.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { ADMIN_MUNICIPALITY_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface AdminDeleteMunicipalityProps {
    service: IAdminMunicipalityService;
}

interface AdminDeleteMunicipalityInput {
    uuid: string;
}

export const useAdminDeleteMunicipality = ({ service }: AdminDeleteMunicipalityProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: AdminDeleteMunicipalityInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_MUNICIPALITY_FILTER]);
                toastSuccess("Município deletado com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar município");
            }
        }
    );
};
