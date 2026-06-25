import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { PersonService } from "../contract/person.service";
import { ORG_PAGINATE_PERSON } from "./keys";

interface Props {
    service: PersonService;
}

export const useOrgDeletePerson = ({ service }: Props) => {
    const queryClient = useQueryClient();
    return useMutation(
        (uuid: string) => service.delete(uuid),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ORG_PAGINATE_PERSON]);
                toastSuccess("Utilizador eliminado com sucesso");
            },
            onError: () => {
                toastError("Erro ao eliminar utilizador");
            },
        }
    );
};
