import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import type { ILoginService } from "../contract/login.service";
import type { LoginRequest } from "../model/login.model";
import { useMutation } from "@sveltestack/svelte-query";
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { UserType } from "../../../register/data/model/register.model";
import { userAuthStore } from "$lib/stores/user-auth.store";
import { cartStore } from "$lib/stores/cart.store";

interface LoginProps {
    service: ILoginService;
}

export const useLogin = ({
    service,
}: LoginProps) => {
    return useMutation(
        (request: LoginRequest) => service.login(request),
        {
            onSuccess: (data) => {
                userAuthStore.setUserAuthResponse(data);
                toastSuccess("Login realizado com sucesso");

                const cart = cartStore.getItems();
                if (cart.length > 0) {
                    const first = cart[0];
                    goto(resolve(`/product/${first.productSlug}`), { replaceState: true });
                    return;
                }

                switch (data.type) {
                    case UserType.CLIENT:
                        goto(resolve("/dashboard/client"), { replaceState: true });
                        break;
                    case UserType.ORGANIZATION:
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
