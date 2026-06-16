import type { IAdminProvinceService } from "../contract/province.service";
import type { ProvinceRequest } from "../../../../shared/location/model/location.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ADMIN_PROVINCE_FILTER } from "./keys";

interface AdminUpdateProvinceProps {
    service: IAdminProvinceService;
}

interface AdminUpdateProvinceInput {
    uuid: string;
    request: ProvinceRequest;
}

export const useAdminUpdateProvince = ({ service }: AdminUpdateProvinceProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: AdminUpdateProvinceInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_PROVINCE_FILTER]);
                toastSuccess("Província atualizada com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar província");
            }
        }
    );
};
