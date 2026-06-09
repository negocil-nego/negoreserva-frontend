<script lang="ts">
  import { z } from "zod";
  import { superForm } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import * as Form from "$lib/components/ui/form/index.js";
  import { InputIcon } from "$lib/components/ui/input-icon";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { MailOpen02Icon } from "@hugeicons/core-free-icons";
  import InputPassword from "$lib/feature/pub/auth/input-password.svelte";
  import { LoginService } from "$lib/feature/pub/auth/login/data/service/login.service";
  import { useLogin } from "$lib/feature/pub/auth/login/data/hooks/use-login";
  import Button from "$lib/components/ui/button/button.svelte";

  const service = new LoginService();
  const loginMutation = useLogin({ service });

  const loginSchema = z.object({
    username: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  });

  const LOGIN_EMPTY = {
    username: "",
    password: "",
  };

  const form = superForm(LOGIN_EMPTY, {
    validators: zod4Client(loginSchema),
    SPA: true,
  });

  const { form: formData, errors, enhance } = form;

  const isValid = $derived(
    $formData.username !== "" &&
      !$errors.username?.length &&
      $formData.password !== "" &&
      !$errors.password?.length,
  );

  let isLoading = $derived($loginMutation.isLoading);

  function onSubmit(e: Event) {
    e.preventDefault();

    $loginMutation.mutateAsync({
      username: $formData.username,
      password: $formData.password,
    });
  }
</script>

<form use:enhance class="w-10/12 md:w-full mx-auto space-y-4 lg:w-10/12" onsubmit={onSubmit}>
  <div class="text-center space-y-1">
    <div class="text-lg font-bold">Autenticação</div>
    <div class="text-muted-foreground text-sm">
      Insira suas credenciais para acessar sua conta
    </div>
  </div>

  <Form.Field {form} name="username">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Nome de usuário ou Email</Form.Label>
        <InputIcon
          {...props}
          bind:value={$formData.username}
          type="email"
          placeholder="adao.silva#negocio ou adao.silva@email.com"
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
        <div class="flex items-center">
          <Form.Label class="text-sm">Senha</Form.Label>
          <Button
            variant="link"
            href="/auth/forget-password"
            class="ms-auto text-sm underline-offset-4 hover:underline"
          >
            Esqueci minha senha
          </Button>
        </div>
        <InputPassword {...props} bind:value={$formData.password} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button
    class="md:p-5 w-full bg-brand cursor-pointer"
    type="submit"
    disabled={!isValid || isLoading}
  >
    {isLoading ? "Entrando..." : "Entrar"}
  </Form.Button>
</form>
