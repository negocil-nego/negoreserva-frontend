<script lang="ts">
  import { z } from "zod";
  import { superForm } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import * as Form from "$lib/components/ui/form/index.js";
  import { InputIcon } from "$lib/components/ui/input-icon";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    User03Icon,
    MailOpen02Icon,
    SmartPhone01Icon,
  } from "@hugeicons/core-free-icons";
  import InputPassword from "$lib/feature/pub/auth/input-password.svelte";
  import { RegisterService } from "$lib/feature/pub/auth/register/data/service/register.service";
  import { useCreateAccountOrganization } from "$lib/feature/pub/auth/register/data/hooks/use-create-account-organization";
  import CategorySelectorPopover from "./category-selector-popover.svelte";
  import { registerCategoryStore } from "$lib/stores/register.store";

  const service = new RegisterService();
  const saveMutation = useCreateAccountOrganization({ service });

  const organizationSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório").max(100),
    email: z.string().min(1, "Email é obrigatório").max(100),
    phone: z
      .string()
      .regex(/^\+?[0-9]{7,15}$/, "Telefone inválido")
      .max(15),
    password: z.string().min(1, "Senha é obrigatória").min(6),
    repeatPassword: z
      .string()
      .min(1, "Confirmação da senha é obrigatória")
      .min(6),
  });

  const ORGANIZATION_EMPTY = {
    name: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
  };

  const form = superForm(ORGANIZATION_EMPTY, {
    validators: zod4Client(organizationSchema),
    SPA: true,
  });

  const { form: formData, errors, enhance } = form;

  const selectedCategories = $derived($registerCategoryStore);
  const hasCategorySelected = $derived(selectedCategories.length > 0);

  const isValid = $derived(
    $formData.name !== "" &&
      !$errors.name?.length &&
      $formData.email !== "" &&
      !$errors.email?.length &&
      $formData.phone !== "" &&
      !$errors.phone?.length &&
      hasCategorySelected,
  );

  let isLoading = $derived($saveMutation.isLoading);

  function onSubmit(e: Event) {
    e.preventDefault();
    if ($formData.password !== $formData.repeatPassword) {
      return;
    }

    $saveMutation.mutateAsync({
      name: $formData.name,
      email: $formData.email,
      phone: $formData.phone,
      password: $formData.password,
      confirm: $formData.repeatPassword,
      categories: [],
    });
  }
</script>

<form use:enhance class="w-10/12 md:w-full mx-auto space-y-4" onsubmit={onSubmit}>
  <div class="text-center space-y-1">
    <div class="text-lg font-bold">Criar conta de empresa</div>
    <div class="text-muted-foreground text-sm">
      Preencha os dados abaixo para criar sua conta de empresa
    </div>
  </div>

  <Form.Field {form} name="name">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Nome</Form.Label>
        <InputIcon
          {...props}
          bind:value={$formData.name}
          placeholder="Nome da empresa"
          class="md:p-5 text-sm"
        >
          {#snippet preffix()}
            <HugeiconsIcon
              icon={User03Icon}
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

  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Email</Form.Label>
        <InputIcon
          {...props}
          bind:value={$formData.email}
          type="email"
          placeholder="negocio@email.com"
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

  <Form.Field {form} name="phone">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="text-sm">Telefone</Form.Label>
        <InputIcon
          {...props}
          bind:value={$formData.phone}
          placeholder="+351912345678"
          class="md:p-5 text-sm"
        >
          {#snippet preffix()}
            <HugeiconsIcon
              icon={SmartPhone01Icon}
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

  <CategorySelectorPopover />

  {#if !hasCategorySelected}
    <p class="text-destructive text-xs -mt-3">Seleccione pelo menos uma categoria</p>
  {/if}

  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <Form.Field {form} name="password">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label class="text-sm">Senha</Form.Label>
          <InputPassword {...props} bind:value={$formData.password} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="repeatPassword">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label class="text-sm">Confirmar senha</Form.Label>
          <InputPassword {...props} bind:value={$formData.repeatPassword} />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  </div>

  <Form.Button
    class="md:p-5 w-full bg-brand cursor-pointer"
    type="submit"
    disabled={!isValid || isLoading}
  >
    {isLoading ? "Cadastrando..." : "Cadastrar"}
  </Form.Button>
</form>
