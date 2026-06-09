import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { IRegisterService } from "../contract/register.service";
import type { CreateAccountOrganizationInput } from "../model/register.model";
import { useMutation } from "@sveltestack/svelte-query";
import { registerStore, registerCategoryStore } from "$lib/stores/register.store";

interface CreateAccountOrganizationProps {
    service: IRegisterService;
}

export const useCreateAccountOrganization = ({
    service,
}: CreateAccountOrganizationProps) => {
    return useMutation(
        (request: CreateAccountOrganizationInput) => {
            const categories = registerCategoryStore.getItems().map((c) => c.uuid);
            return service.createAccountOrganization({ ...request, categories });
        },
        {
            onSuccess: (data) => {
                if (data.status) {
                    registerStore.setAccountResponse(data!);
                    registerCategoryStore.clear();
                    toastSuccess("Conta criada com sucesso");
                    goto(resolve("/auth/otp"));
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
