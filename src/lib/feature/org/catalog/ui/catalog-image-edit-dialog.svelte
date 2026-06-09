<script lang="ts">
  import type { OrgCatalogResponse } from "../data/model/catalog.model";
  import { useUpdateImageCatalog } from "../data/usecase/useUpdateImageCatalog";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let {
    item = $bindable(null as OrgCatalogResponse | null),
    onSuccess,
    onClose,
  }: {
    item: OrgCatalogResponse | null;
    onSuccess?: () => void;
    onClose?: () => void;
  } = $props();

  let imageFile = $state<File | null>(null);
  let imagePreview = $state<string | null>(null);
  let isLoading = $state(false);
  let open = $derived(item !== null);

  $effect(() => {
    if (item) {
      imageFile = null;
      imagePreview = null;
    }
  });

  function handleImageSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      imageFile = file;
      imagePreview = URL.createObjectURL(file);
    }
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!item || !imageFile) return;
    isLoading = true;
    try {
      await useUpdateImageCatalog(item.uuid, imageFile);
      onSuccess?.();
    } catch (err) {
      console.error("Erro ao atualizar imagem:", err);
    } finally {
      isLoading = false;
    }
  }

  function handleClose() {
    imageFile = null;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    imagePreview = null;
    onClose?.();
  }
</script>

<Dialog.Root open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Editar Imagem</Dialog.Title>
      <Dialog.Description>Altere a imagem de capa do catálogo.</Dialog.Description>
    </Dialog.Header>
    <form onsubmit={handleSubmit} class="grid gap-4">
      {#if item?.imgUrl}
        <div class="rounded-lg overflow-hidden border">
          <img src={item.imgUrl} alt="Imagem atual" class="w-full h-40 object-cover" />
          <p class="text-xs text-muted-foreground text-center py-1">Imagem actual</p>
        </div>
      {/if}
      <div class="grid gap-2">
        <label for="catalog_image"  class="text-sm font-medium">Nova imagem</label>
        {#if imagePreview}
          <div class="relative rounded-lg overflow-hidden border">
            <img src={imagePreview} alt="Preview" class="w-full h-32 object-cover" />
            <button type="button" onclick={() => { imageFile = null; if (imagePreview) URL.revokeObjectURL(imagePreview); imagePreview = null; }} class="absolute top-1 right-1 bg-black/50 text-white rounded-full size-6 flex items-center justify-center text-xs hover:bg-black/70">
              ✕
            </button>
          </div>
        {:else}
          <label class="flex flex-col items-center justify-center h-32 rounded-lg border border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground mb-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span class="text-xs text-muted-foreground">Clique para selecionar</span>
            <input id="catalog_image" type="file" accept="image/*" onchange={handleImageSelect} class="hidden" />
          </label>
        {/if}
      </div>
      <Dialog.Footer>
        <Button type="button" onclick={handleClose} class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border hover:bg-muted transition-colors">
          Cancelar
        </Button>
        <Button class="bg-brand" type="submit" disabled={isLoading || !imageFile}>
          {isLoading ? "A enviar..." : "Actualizar imagem"}
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
