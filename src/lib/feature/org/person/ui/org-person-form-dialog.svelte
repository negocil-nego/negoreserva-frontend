<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import type { Person, OrgRoleItem } from "../data/model/person";
  import InputIcon from "$lib/components/ui/input-icon/input-icon.svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    MailOpen02Icon,
    SmartPhone01Icon,
    User02Icon,
  } from "@hugeicons/core-free-icons";
  import RoleMultiSelect from "./role-multi-select.svelte";

  type PersonAction = "create" | "update" | "delete" | "roles";

  let {
    open = $bindable(false),
    form = $bindable<Person>(),
    action = $bindable<PersonAction>("create"),
    selectedRoles = $bindable<OrgRoleItem[]>(),
    allRoles = $bindable<OrgRoleItem[]>([]),
    isLoading = false,
    onSubmit,
  }: {
    open: boolean;
    form: Person;
    action: PersonAction;
    selectedRoles: OrgRoleItem[];
    allRoles: OrgRoleItem[];
    isLoading?: boolean;
    onSubmit: () => void | Promise<void>;
  } = $props();

  function handleSubmit(event: Event) {
    event.preventDefault();
    onSubmit();
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-[520px]">
    <Dialog.Header>
      <Dialog.Title>
        {#if action === "create"}
          Novo utilizador
        {:else if action === "update"}
          Editar utilizador
        {:else}
          Eliminar utilizador
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if action === "delete"}
          Confirme a eliminacao deste utilizador.
        {:else}
          Preencha os dados do utilizador.
        {/if}
      </Dialog.Description>
    </Dialog.Header>

    <form class="space-y-3" onsubmit={handleSubmit}>
      {#if action !== "delete"}
        <InputIcon
          bind:value={form.name}
          label="Nome"
          placeholder="Digita o nome"
          required
        >
          {#snippet preffix()}
            <HugeiconsIcon
              icon={User02Icon}
              size={20}
              color="currentColor"
              strokeWidth={1}
            />
          {/snippet}
        </InputIcon>

        <InputIcon
          bind:value={form.email}
          label="Email"
          placeholder="Digita o email"
          type="email"
          disabled={action === "update"}
          required
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

        <InputIcon
          bind:value={form.phone}
          label="Telefone"
          placeholder="Digita o telefone"
          disabled={action === "update"}
          required
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

        <RoleMultiSelect
          items={allRoles}
          bind:selected={selectedRoles}
          placeholder="Selecionar cargos..."
        />
      {:else}
        <div class="border p-3 text-sm">{form.name}</div>
      {/if}

      <Dialog.Footer>
        <Dialog.Close
          type="button"
          class="inline-flex cursor-pointer items-center justify-center px-4 py-2 text-sm font-medium border hover:bg-muted transition-colors"
        >
          Cancelar
        </Dialog.Close>
        <Button
          type="submit"
          disabled={isLoading}
          variant={action === "delete" ? "destructive" : "default"}
          class={action === "delete" ? "" : "bg-brand cursor-pointer"}
        >
          {#if action === "create"}
            Criar
          {:else if action === "update"}
            Guardar
          {:else}
            Eliminar
          {/if}
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
