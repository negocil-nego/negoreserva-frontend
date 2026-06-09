<script lang="ts">
  import type { OrgCatalogResponse } from "../data/model/catalog.model";
  import { OrgCatalogService } from "../data/service/catalog.service";
  import { useOrgUpdateCatalog } from "../data/hooks/use-update";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  let {
    item = $bindable(null as OrgCatalogResponse | null),
    onSuccess,
    onClose,
  }: {
    item: OrgCatalogResponse | null;
    onSuccess?: () => void;
    onClose?: () => void;
  } = $props();

  let service = new OrgCatalogService();
  let updateMutation = useOrgUpdateCatalog({ service });

  let name = $state("");
  let description = $state("");
  let open = $derived(item !== null);

  $effect(() => {
    if (item) {
      name = item.name;
      description = item.description;
    }
  });

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!item || !name.trim() || !description.trim()) return;
    try {
      await $updateMutation.mutateAsync({
        uuid: item.uuid,
        request: { name: name.trim(), description: description.trim() }
      });
      onSuccess?.();
    } catch (err) {
      console.error("Erro ao atualizar catálogo:", err);
    }
  }

  function handleClose() {
    onClose?.();
  }
</script>

<Dialog.Root open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
  <Dialog.Content class="sm:max-w-106.25">
    <Dialog.Header>
      <Dialog.Title>Editar Catálogo</Dialog.Title>
      <Dialog.Description>Altere os dados do catálogo.</Dialog.Description>
    </Dialog.Header>
    <form onsubmit={handleSubmit} class="grid gap-4">
      <div class="grid gap-2">
        <label for="catalog_name" class="text-sm font-medium">Nome</label>
        <Input id="catalog_name" bind:value={name} placeholder="Nome do catálogo" required />
      </div>
      <div class="grid gap-2">
        <label for="catalog_description" class="text-sm font-medium">Descrição</label>
        <textarea id="catalog_description"
          bind:value={description}
          placeholder="Descrição do catálogo"
          required
          class="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        ></textarea>
      </div>
      <Dialog.Footer>
        <Button type="button" onclick={handleClose} class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border hover:bg-muted transition-colors">
          Cancelar
        </Button>
        <Button class="bg-brand" type="submit" disabled={$updateMutation.isLoading || !name.trim() || !description.trim()}>
          {$updateMutation.isLoading ? "A guardar..." : "Guardar"}
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
