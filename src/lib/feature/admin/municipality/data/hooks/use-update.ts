import type { IAdminMunicipalityService } from "../contract/municipality.service";
import type { MunicipalityRequest } from "../../../../shared/location/model/location.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ADMIN_MUNICIPALITY_FILTER } from "./keys";

interface AdminUpdateMunicipalityProps {
    service: IAdminMunicipalityService;
}

interface AdminUpdateMunicipalityInput {
    uuid: string;
    request: MunicipalityRequest;
}

export const useAdminUpdateMunicipality = ({ service }: AdminUpdateMunicipalityProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: AdminUpdateMunicipalityInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_MUNICIPALITY_FILTER]);
                toastSuccess("Município atualizado com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar município");
            }
        }
    );
};
