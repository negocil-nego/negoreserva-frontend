import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { deleteAccountStore } from "$lib/stores/delete-account.store";
import { useMutation } from "@sveltestack/svelte-query";
import type { IDeleteAccountService } from "../contract/delete-account.service";
import type { UserDeleteAccountConfirmRequest } from "../model/delete-account.model";

interface DeleteAccountConfirmProps {
  service: IDeleteAccountService;
}

export const useDeleteAccountConfirm = ({ service }: DeleteAccountConfirmProps) => {
  return useMutation(
    (request: UserDeleteAccountConfirmRequest) => service.confirmDeleteAccount(request),
    {
      onSuccess: (data) => {
        if (data) {
          deleteAccountStore.reset();
          toastSuccess("Conta eliminada com sucesso");
          goto(resolve("/auth/signin"));
        } else {
          toastError("Erro ao eliminar conta");
        }
      },
      onError: (e) => {
        if (handleCombinedGraphqlErrors(e)) return;
        toastError("Erro ao eliminar conta");
      },
    },
  );
};
