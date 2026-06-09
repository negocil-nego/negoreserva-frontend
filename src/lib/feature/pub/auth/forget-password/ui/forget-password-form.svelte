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
  import { ForgetPasswordService } from "$lib/feature/pub/auth/forget-password/data/service/forget-password.service";
  import { useForgetPassword } from "$lib/feature/pub/auth/forget-password/data/hooks/use-forget-password";

  const service = new ForgetPasswordService();
  const forgetPasswordMutation = useForgetPassword({ service });

  const forgetPasswordSchema = z.object({
    emailOrPhone: z.string().min(1, "Email ou telefone é obrigatório"),
  });

  const FORGET_PASSWORD_EMPTY = {
    emailOrPhone: "",
  };

  const form = superForm(FORGET_PASSWORD_EMPTY, {
    validators: zod4Client(forgetPasswordSchema),
    SPA: true,
  });

  const { form: formData, errors, enhance } = form;

  const isValid = $derived(
    $formData.emailOrPhone !== "" && !$errors.emailOrPhone?.length,
  );

  let isLoading = $derived($forgetPasswordMutation.isLoading);

  function onSubmit(e: Event) {
    e.preventDefault();

    $forgetPasswordMutation.mutateAsync({
      input: $formData.emailOrPhone,
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

    <div class="text-lg font-bold my-5">Esqueci minha senha</div>
    <div class="text-muted-foreground text-sm">
      <div>Informa seu email ou telefone cadastrado.</div>
      <div>
        <div>Enviaremos um código de verificação para você</div>
        <div>redefinir sua senha com segurança.</div>
      </div>
    </div>
  </div>

  <Form.Field {form} name="emailOrPhone">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Email ou telefone</Form.Label>
        <InputIcon
          {...props}
          bind:value={$formData.emailOrPhone}
          placeholder="negocio@email.com ou 932432343"
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

  <Form.Button
    class="md:p-5 w-full bg-brand cursor-pointer"
    type="submit"
    disabled={!isValid || isLoading}
  >
    {isLoading ? "Enviando..." : "Enviar"}
  </Form.Button>
</form>
