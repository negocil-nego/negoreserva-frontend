import type { IAdminPersonService } from "../contract/person.service";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ADMIN_PERSON_FILTER } from "./keys";

interface AdminDeletePersonProps {
    service: IAdminPersonService;
}

interface AdminDeletePersonInput {
    uuid: string;
}

export const useAdminDeletePerson = ({ service }: AdminDeletePersonProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid }: AdminDeletePersonInput) => {
            return service.deleteByUuid(uuid);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_PERSON_FILTER]);
                toastSuccess("Pessoa deletada com sucesso");
            },
            onError: () => {
                toastError("Erro ao deletar pessoa");
            }
        }
    );
};