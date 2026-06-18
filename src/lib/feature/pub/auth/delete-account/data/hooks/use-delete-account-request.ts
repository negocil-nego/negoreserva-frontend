import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { handleCombinedGraphqlErrors } from "$lib/hooks/graphq-errors";
import { toastError, toastSuccess } from "$lib/hooks/toast-status";
import { deleteAccountStore } from "$lib/stores/delete-account.store";
import { useMutation } from "@sveltestack/svelte-query";
import type { IDeleteAccountService } from "../contract/delete-account.service";
import type { UserDeleteAccountRequest } from "../model/delete-account.model";

interface DeleteAccountRequestProps {
  service: IDeleteAccountService;
}

export const useDeleteAccountRequest = ({ service }: DeleteAccountRequestProps) => {
  return useMutation(
    (request: UserDeleteAccountRequest) => service.sendMessageDeleteAccount(request),
    {
      onSuccess: (data) => {
        if (data) {
          deleteAccountStore.setProcess(data);
          toastSuccess("Código de eliminação enviado com sucesso");
          goto(resolve("/auth/delete-account/confirm" as any));
        } else {
          toastError("Erro ao enviar código de eliminação");
        }
      },
      onError: (e) => {
        if (handleCombinedGraphqlErrors(e)) return;
        toastError("Erro ao enviar código de eliminação");
      },
    },
  );
};
