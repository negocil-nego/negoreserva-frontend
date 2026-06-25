import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { PersonService } from "../contract/person.service";
import type { PersonCreateRequest } from "../model/person";
import { ORG_PAGINATE_PERSON } from "./keys";

interface Props {
    service: PersonService;
}

export const useOrgSavePerson = ({ service }: Props) => {
    const queryClient = useQueryClient();
    return useMutation(
        (request: PersonCreateRequest) => service.save(request),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_PAGINATE_PERSON]);
                toastSuccess("Utilizador criado com sucesso");
            },
            onError: () => {
                toastError("Erro ao criar utilizador");
            },
        }
    );
};
