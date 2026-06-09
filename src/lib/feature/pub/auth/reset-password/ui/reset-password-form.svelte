<script lang="ts">
  import { z } from "zod";
  import { superForm } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import * as Form from "$lib/components/ui/form/index.js";
  import { InputIcon } from "$lib/components/ui/input-icon";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    MailOpen02Icon,
    SecurityPasswordIcon,
  } from "@hugeicons/core-free-icons";
  import InputPassword from "../../input-password.svelte";
  import { ResetPasswordService } from "../data/service/reset-password.service";
  import { useForgetResetPassword } from "../data/hooks/use-forget-reset-password";
  
  const service = new ResetPasswordService();
  const resetForgetPasswordMutation = useForgetResetPassword({ service });

  const resetPasswordSchema = z.object({
    code: z.string().min(1, "Código é obrigatório"),
    password: z.string().min(1, "Senha é obrigatória"),
    confirm: z.string().min(1, "Confirmação é obrigatória"),
  });

  const RESET_PASSWORD_EMPTY = {
    code: "",
    password: "",
    confirm: "",
  };
  const form = superForm(RESET_PASSWORD_EMPTY, {
    validators: zod4Client(resetPasswordSchema),
    SPA: true,
  });

  const { form: formData, errors, enhance } = form;

  const isValid = $derived(
    $formData.code !== "" &&
      $formData.password !== "" &&
      $formData.confirm !== "" &&
      !$errors.code?.length &&
      !$errors.password?.length &&
      !$errors.confirm?.length,
  );

  let isLoading = $derived($resetForgetPasswordMutation.isLoading);

  function onSubmit(e: Event) {
    e.preventDefault();

    $resetForgetPasswordMutation.mutateAsync({
      code: $formData.code,
      password: $formData.password,
      confirm: $formData.confirm,
    });
  }
</script>

<form use:enhance class="w-full mx-auto space-y-4" onsubmit={onSubmit}>
  <div class="text-center space-y-1">
    <div class="flex items-center justify-center w-full my-5">
      <HugeiconsIcon
        icon={SecurityPasswordIcon}
        size={100}
        color="currentColor"
        strokeWidth={1}
      />
    </div>

    <div class="text-lg font-bold my-5">Redefinir senha</div>
    <div class="text-muted-foreground text-sm">
      <div>Enviaremos um código de verificação para você</div>
      <div>redefinir sua senha com segurança.</div>
    </div>
  </div>

  <Form.Field {form} name="code">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Código de verificação</Form.Label>
        <InputIcon
          {...props}
          bind:value={$formData.code}
          placeholder=""
          class="md:p-5 text-sm"
        >
          {#snippet preffix()}
            <HugeiconsIcon
              icon={MailOpen02Icon}
              size={20}
              color="currentColor"
              strokeWidth={1}
            />
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

  <Form.Field {form} name="confirm">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Confirmar senha</Form.Label>
        <InputPassword {...props} bind:value={$formData.confirm} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button
    class="md:p-5 w-full bg-brand cursor-pointer"
    type="submit"
    disabled={!isValid || isLoading}
  >
    {isLoading ? "Enviando..." : "Enviar"}
  </Form.Button>
</form>
