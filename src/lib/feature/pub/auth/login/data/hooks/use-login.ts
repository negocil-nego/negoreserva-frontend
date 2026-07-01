import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { ILoginService } from "../contract/login.service";
import { userAuthStore } from "$lib/stores/user-auth.store";
import type { AccountSituationResponse } from "../../../me/data/model/account-situation.model";
import type { LoginRequest } from "../model/login.model";
import { useMutation } from "@sveltestack/svelte-query";
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { UserType } from "../../../register/data/model/register.model";

interface LoginProps {
    service: ILoginService;
    loadAccountSituations?: () => Promise<AccountSituationResponse[]>;
    onAccountSituations?: (situations: AccountSituationResponse[]) => void;
}

export const useLogin = ({
    service,
    loadAccountSituations,
    onAccountSituations,
}: LoginProps) => {
    return useMutation(
        (request: LoginRequest) => service.login(request),
        {
            onSuccess: async (data) => {
                userAuthStore.setUserAuthResponse(data);
                toastSuccess("Login realizado com sucesso");
                switch (data.type) {
                    case UserType.CLIENT:
                        goto(resolve("/dashboard/client"), { replaceState: true });
                        break;
                    case UserType.ORGANIZATION:
                        if (loadAccountSituations) {
                            const situations = await loadAccountSituations();
                            if (situations.length > 0) {
                                onAccountSituations?.(situations);
                                return;
                            }
                        }
                        goto(resolve("/dashboard/organization"), { replaceState: true });
                        break;
                    case UserType.ADMIN:
                        goto(resolve("/dashboard/admin"), { replaceState: true });
                        break;
                }

            },
            onError: (e) => {
                if (handleCombinedGraphqlErrors(e)) return;
                toastError("Erro ao fazer login");
            }
        }
    );
};
