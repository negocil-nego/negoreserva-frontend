import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { IRegisterService } from "../contract/register.service";
import type { CreateAccountClientInput } from "../model/register.model";
import { useMutation } from "@sveltestack/svelte-query";
import { registerStore } from "$lib/stores/register.store";
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";

interface CreateAccountClientProps {
    service: IRegisterService;
}

export const useCreateAccountClient = ({
    service,
}: CreateAccountClientProps) => {
    return useMutation(
        (request: CreateAccountClientInput) => service.createAccountClient(request),
        {
            onSuccess: (data) => {
                if (data.status) {
                    registerStore.setAccountResponse(data!);
                    toastSuccess("Conta criada com sucesso");
                    goto(resolve("/auth/otp"), { replaceState: true });
                } else {
                    toastError("Erro ao criar conta");
                }
            },
            onError: (e) => {
                if (handleCombinedGraphqlErrors(e)) return;
                toastError("Erro ao criar conta");
            }
        }
    );
};
