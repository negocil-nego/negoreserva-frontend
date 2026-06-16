import type { IAdminProvinceService } from "../contract/province.service";
import type { ProvinceRequest } from "../../../../shared/location/model/location.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ADMIN_PROVINCE_FILTER } from "./keys";

interface AdminSaveProvinceProps {
    service: IAdminProvinceService;
}

export const useAdminSaveProvince = ({
    service,
}: AdminSaveProvinceProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: ProvinceRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_PROVINCE_FILTER]);
                toastSuccess("Província salva com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar província");
            }
        }
    );
};
