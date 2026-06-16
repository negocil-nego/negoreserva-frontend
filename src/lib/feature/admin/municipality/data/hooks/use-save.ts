import type { IAdminMunicipalityService } from "../contract/municipality.service";
import type { MunicipalityRequest } from "../../../../shared/location/model/location.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ADMIN_MUNICIPALITY_FILTER } from "./keys";

interface AdminSaveMunicipalityProps {
    service: IAdminMunicipalityService;
}

export const useAdminSaveMunicipality = ({
    service,
}: AdminSaveMunicipalityProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: MunicipalityRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_MUNICIPALITY_FILTER]);
                toastSuccess("Município salvo com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar município");
            }
        }
    );
};
