import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { ILogoutService } from "../contract/logout.service";
import { useMutation } from "@sveltestack/svelte-query";
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { userAuthStore } from "$lib/stores/user-auth.store";

interface LogoutProps {
    service: ILogoutService;
}


export const useLogout = ({
    service,
}: LogoutProps) => {
    return useMutation(
        () => service.logout(),
        {
            onSuccess: () => {
                toastSuccess("Logout realizado com sucesso");
                userAuthStore.logoutUserAuthResponse();
                goto(resolve("/"))
            },
            onError: (e) => {
                if (handleCombinedGraphqlErrors(e)) return;
                toastError("Erro ao fazer logout");
            }
        }
    );
};
