<script lang="ts">
  import type { OrgRoleResponse } from "../data/model/role.model";
  import { OrgRoleService } from "../data/service/role.service";
  import { useOrgSaveRole } from "../data/hooks/use-save";
  import { useOrgUpdateRole } from "../data/hooks/use-update";
  import { useOrgDeleteRole } from "../data/hooks/use-delete";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import OrgPermissionSelectorPopover, {
    type OrgPermissionSelectorItem,
  } from "$lib/feature/org/simple-crud/org-permission-selector-popover.svelte";

  type FormAction = "create" | "update" | "delete";

  let {
    open = $bindable(false),
    item = $bindable(null as OrgRoleResponse | null),
    action = $bindable<FormAction>("create"),
    selectedPermissions = $bindable<OrgPermissionSelectorItem[]>([]),
    isLoading = false,
    onSuccess,
  }: {
    open: boolean;
    item: OrgRoleResponse | null;
    action: FormAction;
    selectedPermissions: OrgPermissionSelectorItem[];
    isLoading?: boolean;
    onSuccess?: () => void;
  } = $props();

  let service = new OrgRoleService();
  let saveMutation = useOrgSaveRole({ service });
  let updateMutation = useOrgUpdateRole({ service });
  let deleteMutation = useOrgDeleteRole({ service });

  let name = $state("");

  $effect(() => {
    if (action === "create") {
      name = "";
    } else if (item) {
      name = item.name;
    }
  });

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (isLoading) return;

    if (action === "create") {
      if (!name.trim()) return;
      try {
        await $saveMutation.mutateAsync({ name: name.trim() });
        onSuccess?.();
      } catch (err) {
        console.error("Erro ao criar função:", err);
      }
    } else if (action === "update") {
      if (!item || !name.trim()) return;
      try {
        await $updateMutation.mutateAsync({
          uuid: item.uuid,
          request: {
            name: name.trim(),
            permissionUuids: selectedPermissions.map((p) => p.uuid),
          },
        });
        onSuccess?.();
      } catch (err) {
        console.error("Erro ao atualizar função:", err);
      }
    } else {
      if (!item) return;
      try {
        await $deleteMutation.mutateAsync(item.uuid);
        onSuccess?.();
      } catch (err) {
        console.error("Erro ao eliminar função:", err);
      }
    }
  }
</script>

<Dialog.Root
  bind:open
  onOpenChange={(o) => {
    if (!o) {
      open = false;
      item = null;
    }
  }}
>
  <Dialog.Content
    class={["sm:max-w-106.25", action === "delete" && "border border-red-400"]}
  >
    <Dialog.Header>
      <Dialog.Title class={[action === "delete" && "text-red-400"]}>
        {#if action === "create"}
          Nova Função
        {:else if action === "update"}
          Editar Função
        {:else}
          Eliminar Função
        {/if}
      </Dialog.Title>
      <Dialog.Description>
        {#if action === "delete"}
          Confirme a eliminação desta função.
        {:else}
          Preencha os dados da função.
        {/if}
      </Dialog.Description>
    </Dialog.Header>

    <form class="space-y-3" onsubmit={handleSubmit}>
      {#if action !== "delete"}
        <div class="grid gap-2">
          <label for="role_name" class="text-sm font-medium">Nome</label>
          <Input
            id="role_name"
            bind:value={name}
            placeholder="Nome da função"
            required
          />
        </div>
        {#if action === "update"}
          <OrgPermissionSelectorPopover
            selected={selectedPermissions}
            onChange={(permissions) => (selectedPermissions = permissions)}
          />
        {/if}
      {:else}
        <div class="border p-3 text-sm">{item?.name}</div>
      {/if}

      <Dialog.Footer>
        <Dialog.Close
          type="button"
          class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border hover:bg-muted transition-colors"
        >
          Cancelar
        </Dialog.Close>
        {#if action === "delete"}
          <Button
            type="submit"
            variant="destructive"
            disabled={$deleteMutation.isLoading}
          >
            {$deleteMutation.isLoading ? "A eliminar..." : "Eliminar"}
          </Button>
        {:else if action === "create"}
          <Button
            class="bg-brand"
            type="submit"
            disabled={$saveMutation.isLoading || !name.trim()}
          >
            {$saveMutation.isLoading ? "A criar..." : "Criar"}
          </Button>
        {:else}
          <Button
            class="bg-brand"
            type="submit"
            disabled={$updateMutation.isLoading || !name.trim()}
          >
            {$updateMutation.isLoading ? "A guardar..." : "Guardar"}
          </Button>
        {/if}
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
