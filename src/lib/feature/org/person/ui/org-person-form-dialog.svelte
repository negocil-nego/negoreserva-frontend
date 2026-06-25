<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import OrgRoleSelectorPopover, { type OrgRoleSelectorItem } from "$lib/feature/org/simple-crud/org-role-selector-popover.svelte";
  import type { Person } from "../data/model/person";

  type PersonAction = "create" | "update" | "delete";

  let {
    open = $bindable(false),
    form = $bindable<Person>(),
    action = $bindable<PersonAction>("create"),
    selectedRoles = $bindable<OrgRoleSelectorItem[]>([]),
    isLoading = false,
    onSubmit,
  }: {
    open: boolean;
    form: Person;
    action: PersonAction;
    selectedRoles: OrgRoleSelectorItem[];
    isLoading?: boolean;
    onSubmit: () => void | Promise<void>;
  } = $props();

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    onSubmit();
  };
</script>

<Dialog.Root bind:open>
  <Dialog.Content
    class={["sm:max-w-[520px]", action === "delete" && "border border-red-400"]}
  >
    <Dialog.Header>
      <Dialog.Title class={[action === "delete" && "text-red-400"]}>
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
        <input
          class="w-full border px-3 py-2 text-sm"
          placeholder="Nome"
          bind:value={form.name}
          required
        />
        <input
          class="w-full border px-3 py-2 text-sm"
          placeholder="Email"
          type="email"
          bind:value={form.email}
          disabled={action === "update"}
          required
        />
        <input
          class="w-full border px-3 py-2 text-sm"
          placeholder="Telefone"
          bind:value={form.phone}
          disabled={action === "update"}
          required
        />
        <input
          class="w-full border px-3 py-2 text-sm"
          type="date"
          bind:value={form.birthday}
        />

        {#if action === "create"}
          <OrgRoleSelectorPopover
            selected={selectedRoles}
            onChange={(roles) => (selectedRoles = roles)}
          />
        {/if}
      {:else}
        <div class="border p-3 text-sm">{form.name}</div>
      {/if}

      <Dialog.Footer>
        <Dialog.Close
          type="button"
          class={buttonVariants({ variant: "outline" })}
        >
          Cancelar
        </Dialog.Close>
        <button
          type="submit"
          disabled={isLoading}
          class={buttonVariants({
            variant: action === "delete" ? "destructive" : "default",
          })}
        >
          {#if action === "create"}
            Criar
          {:else if action === "update"}
            Guardar
          {:else}
            Eliminar
          {/if}
        </button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
