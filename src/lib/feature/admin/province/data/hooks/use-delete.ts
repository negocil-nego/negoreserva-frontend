import type { IAdminProvinceService } from "../contract/province.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { ADMIN_PROVINCE_FILTER } from "./keys";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";

interface AdminDeleteProvinceProps {
    service: IAdminProvinceService;
}

interface AdminDeleteProvinceInput {
    uuid: string;
}

export const useAdminDeleteProvince = ({ service }: AdminDeleteProvinceProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: AdminDeleteProvinceInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_PROVINCE_FILTER]);
                toastSuccess("Província deletada com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar província");
            }
        }
    );
};
