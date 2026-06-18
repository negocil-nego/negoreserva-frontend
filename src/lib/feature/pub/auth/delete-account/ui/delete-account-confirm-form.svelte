<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { onMount } from "svelte";
  import { z } from "zod";
  import { superForm } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import * as Form from "$lib/components/ui/form/index.js";
  import { InputIcon } from "$lib/components/ui/input-icon";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { MailOpen02Icon, UserRemove01Icon } from "@hugeicons/core-free-icons";
  import InputPassword from "../../input-password.svelte";
  import { deleteAccountStore } from "$lib/stores/delete-account.store";
  import { DeleteAccountService } from "../data/service/delete-account.service";
  import { useDeleteAccountConfirm } from "../data/hooks/use-delete-account-confirm";
  import DeleteAccountCountdown from "./delete-account-countdown.svelte";

  const service = new DeleteAccountService();
  const confirmMutation = useDeleteAccountConfirm({ service });

  const schema = z.object({
    input: z.string().min(1, "Email ou telefone é obrigatório"),
    code: z.string().min(1, "Código é obrigatório"),
    password: z.string().min(1, "Senha é obrigatória"),
  });

  const form = superForm(
    {
      input: "",
      code: "",
      password: "",
    },
    {
      validators: zod4Client(schema),
      SPA: true,
    },
  );

  const { form: formData, errors, enhance } = form;

  let expiredAt = $state("");
  let expired = $state(false);
  let isLoading = $derived($confirmMutation.isLoading);

  onMount(() => {
    const process = deleteAccountStore.getProcess();
    if (!process) {
      goto(resolve("/auth/delete-account" as any));
      return;
    }

    $formData.input = process.input;
    expiredAt = process.expiredAt;
    expired = Date.now() >= Date.parse(process.expiredAt);
  });

  const isValid = $derived(
    $formData.input !== "" &&
      $formData.code !== "" &&
      $formData.password !== "" &&
      !$errors.input?.length &&
      !$errors.code?.length &&
      !$errors.password?.length &&
      !expired,
  );

  function onExpired() {
    expired = true;
    deleteAccountStore.reset();
  }

  function onSubmit(e: Event) {
    e.preventDefault();
    if (!isValid) return;

    $confirmMutation.mutateAsync({
      input: $formData.input,
      code: $formData.code,
      password: $formData.password,
    });
  }
</script>

<form use:enhance class="mx-auto w-full space-y-4" onsubmit={onSubmit}>
  <div class="space-y-1 text-center">
    <div class="my-5 flex w-full items-center justify-center text-red-600">
      <HugeiconsIcon icon={UserRemove01Icon} size={92} color="currentColor" strokeWidth={1} />
    </div>

    <div class="my-5 text-lg font-bold">Confirmar eliminação</div>
    <div class="text-sm text-muted-foreground">
      <div>Digite o código recebido e a sua senha atual.</div>
      <div>O processo expira automaticamente em 5 minutos.</div>
    </div>
  </div>

  {#if expiredAt}
    <DeleteAccountCountdown {expiredAt} {onExpired} />
  {/if}

  {#if expired}
    <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
      O tempo para confirmar a eliminação expirou. Solicite um novo código.
    </div>
  {/if}

  <Form.Field {form} name="input">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Email ou telefone</Form.Label>
        <InputIcon
          {...props}
          bind:value={$formData.input}
          readonly
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

  <Form.Field {form} name="code">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Código OTP</Form.Label>
        <InputIcon
          {...props}
          bind:value={$formData.code}
          placeholder="Digite o código recebido"
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

  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Senha</Form.Label>
        <InputPassword {...props} bind:value={$formData.password} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button
    class="w-full cursor-pointer bg-red-600 text-white hover:bg-red-700 md:p-5"
    type="submit"
    disabled={!isValid || isLoading}
  >
    {isLoading ? "Eliminando..." : "Eliminar conta"}
  </Form.Button>

  <button
    type="button"
    class="w-full rounded-md border px-4 py-3 text-sm font-semibold text-muted-foreground"
    onclick={() => goto(resolve("/auth/delete-account" as any))}
  >
    Pedir novo código
  </button>
</form>
