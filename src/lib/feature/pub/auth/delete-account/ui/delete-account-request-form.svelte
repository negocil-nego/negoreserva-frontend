<script lang="ts">
  import { z } from "zod";
  import { superForm } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import * as Form from "$lib/components/ui/form/index.js";
  import { InputIcon } from "$lib/components/ui/input-icon";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { MailOpen02Icon, UserRemove01Icon } from "@hugeicons/core-free-icons";
  import { DeleteAccountService } from "../data/service/delete-account.service";
  import { useDeleteAccountRequest } from "../data/hooks/use-delete-account-request";

  const service = new DeleteAccountService();
  const deleteAccountMutation = useDeleteAccountRequest({ service });

  const schema = z.object({
    emailOrPhone: z.string().min(1, "Email ou telefone é obrigatório"),
  });

  const form = superForm(
    { emailOrPhone: "" },
    {
      validators: zod4Client(schema),
      SPA: true,
    },
  );

  const { form: formData, errors, enhance } = form;

  const isValid = $derived($formData.emailOrPhone !== "" && !$errors.emailOrPhone?.length);
  let isLoading = $derived($deleteAccountMutation.isLoading);

  function onSubmit(e: Event) {
    e.preventDefault();

    $deleteAccountMutation.mutateAsync({
      input: $formData.emailOrPhone,
    });
  }
</script>

<form use:enhance class="mx-auto w-full space-y-4" onsubmit={onSubmit}>
  <div class="space-y-1 text-center">
    <div class="my-5 flex w-full items-center justify-center text-red-600">
      <HugeiconsIcon icon={UserRemove01Icon} size={92} color="currentColor" strokeWidth={1} />
    </div>

    <div class="my-5 text-lg font-bold">Eliminar conta</div>
    <div class="text-sm text-muted-foreground">
      <div>Informe o email ou telefone associado à sua conta.</div>
      <div>Enviaremos um código de verificação para confirmar este pedido.</div>
    </div>
  </div>

  <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
    Esta ação é sensível. Depois da confirmação, a conta deixará de estar disponível.
  </div>

  <Form.Field {form} name="emailOrPhone">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Email ou telefone</Form.Label>
        <InputIcon
          {...props}
          bind:value={$formData.emailOrPhone}
          placeholder="negocio@email.com ou 932432343"
          class="text-sm md:p-5"
        >
          {#snippet preffix()}
            <HugeiconsIcon icon={MailOpen02Icon} size={20} color="currentColor" strokeWidth={1} />
          {/snippet}
        </InputIcon>
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button
    class="w-full cursor-pointer bg-red-600 text-white hover:bg-red-700 md:p-5"
    type="submit"
    disabled={!isValid || isLoading}
  >
    {isLoading ? "Enviando..." : "Enviar código"}
  </Form.Button>
</form>
