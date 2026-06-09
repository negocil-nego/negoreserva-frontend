import type { IAdminPersonService } from "../contract/person.service";
import type { PersonCreateRequest } from "../model/person.model";
import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { ADMIN_PERSON_FILTER } from "./keys";

interface AdminSavePersonProps {
    service: IAdminPersonService;
}

export const useAdminSavePerson = ({
    service,
}: AdminSavePersonProps) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: PersonCreateRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ADMIN_PERSON_FILTER]);
                toastSuccess("Pessoa salva com sucesso");
            },
            onError: () => {
                toastError("Erro ao salvar pessoa");
            }
        }
    );
};