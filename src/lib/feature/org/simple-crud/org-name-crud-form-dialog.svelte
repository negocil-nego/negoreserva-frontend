<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import OrgPermissionSelectorPopover, { type OrgPermissionSelectorItem } from "./org-permission-selector-popover.svelte";
  import type { NameCrudItem, NameCrudAction, NameCrudResource } from "./data/model/simple-crud";

  let {
    open = $bindable(false),
    form = $bindable<NameCrudItem>(),
    action = $bindable<NameCrudAction>("create"),
    resource,
    selectedPermissions = $bindable<OrgPermissionSelectorItem[]>([]),
    isLoading = false,
    onSubmit,
  }: {
    open: boolean;
    form: NameCrudItem;
    action: NameCrudAction;
    resource: NameCrudResource;
    selectedPermissions: OrgPermissionSelectorItem[];
    isLoading?: boolean;
    onSubmit: () => void | Promise<void>;
  } = $props();

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    onSubmit();
  };
</script>

<Dialog.Root bind:open>
  <Dialog.Content class={["sm:max-w-[520px]", action === "delete" && "border border-red-400"]}>
    <Dialog.Header>
      <Dialog.Title class={[action === "delete" && "text-red-400"]}>
        {#if action === "create"}
          Novo
        {:else if action === "update"}
          Editar
        {:else}
          Eliminar
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if action === "delete"}
          Confirme a eliminacao deste registo.
        {:else}
          Preencha os dados do registo.
        {/if}
      </Dialog.Description>
    </Dialog.Header>

    <form class="space-y-3" onsubmit={handleSubmit}>
      {#if action !== "delete"}
        <input class="w-full border px-3 py-2 text-sm" placeholder="Nome" bind:value={form.name} required />
        <textarea class="w-full border px-3 py-2 text-sm" placeholder="Descricao" rows="4" bind:value={form.description}></textarea>

        {#if resource === "Role"}
          <OrgPermissionSelectorPopover
            selected={selectedPermissions}
            onChange={(permissions) => (selectedPermissions = permissions)}
          />
        {/if}
      {:else}
        <div class="border p-3 text-sm">{form.name}</div>
      {/if}

      <Dialog.Footer>
        <Dialog.Close type="button" class={buttonVariants({ variant: "outline" })}>
          Cancelar
        </Dialog.Close>
        <button
          type="submit"
          disabled={isLoading}
          class={buttonVariants({ variant: action === "delete" ? "destructive" : "default" })}
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
