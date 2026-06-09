import type { IAdminPersonService } from "../contract/person.service";
import type { PersonUpdateRequest } from "../model/person.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ADMIN_PERSON_FILTER } from "./keys";

interface AdminUpdatePersonProps {
    service: IAdminPersonService;
}

interface AdminUpdatePersonInput {
    uuid: string;
    request: PersonUpdateRequest;
}

export const useAdminUpdatePerson = ({ service }: AdminUpdatePersonProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ uuid, request }: AdminUpdatePersonInput) => {
            return service.update(uuid, request);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_PERSON_FILTER]);
                toastSuccess("Pessoa atualizada com sucesso");
            },
            onError: () => {
                toastError("Erro ao atualizar pessoa");
            }
        }
    );
};