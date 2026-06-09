<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import {ORG_CATALOG_FILTER} from "$lib/feature/org/catalog/data/hooks/keys";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { useCreateCatalog } from "../data/usecase/useCreateCatalog";
  import {useQueryClient} from "@sveltestack/svelte-query";

  let {
    open = $bindable(false),
    onSuccess,
  }: {
    open: boolean;
    onSuccess?: () => void;
  } = $props();

  let name = $state("");
  let description = $state("");
  let imageFile = $state<File | null>(null);
  let imagePreview = $state<string | null>(null);
  let isLoading = $state(false);
  const queryClient = useQueryClient();

  function handleImageSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      imageFile = file;
      imagePreview = URL.createObjectURL(file);
    }
  }

  function removeImage() {
    imageFile = null;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    imagePreview = null;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    isLoading = true;
    try {
      await useCreateCatalog(name.trim(), description.trim(), imageFile);
      name = "";
      description = "";
      removeImage();
      onSuccess?.();
      await queryClient.invalidateQueries([ORG_CATALOG_FILTER]);
    } catch (err) {
      console.error("Erro ao criar catálogo:", err);
    } finally {
      isLoading = false;
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-106.25">
    <Dialog.Header>
      <Dialog.Title>Novo Catálogo</Dialog.Title>
      <Dialog.Description>Crie um novo catálogo para organizar seus produtos.</Dialog.Description>
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
          class="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        ></textarea>
      </div>
      <div class="grid gap-2">
        <label for="catalog_image" class="text-sm font-medium">Imagem</label>
        {#if imagePreview}
          <div class="relative rounded-lg overflow-hidden border">
            <img src={imagePreview} alt="Preview" class="w-full h-32 object-cover" />
            <button type="button" onclick={removeImage} class="absolute top-1 right-1 bg-black/50 text-white rounded-full size-6 flex items-center justify-center text-xs hover:bg-black/70">
              ✕
            </button>
          </div>
        {:else}
          <label class="flex flex-col items-center justify-center h-32 rounded-lg border border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground mb-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span class="text-xs text-muted-foreground">Clique para fazer upload</span>
            <input id="catalog_image"  type="file" accept="image/*" onchange={handleImageSelect} class="hidden" />
          </label>
        {/if}
      </div>
      <Dialog.Footer>
        <Dialog.Close type="button" class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border hover:bg-muted transition-colors">
          Cancelar
        </Dialog.Close>
        <Button class="bg-brand" type="submit" disabled={isLoading || !name.trim() || !description.trim()}>
          {isLoading ? "A criar..." : "Criar"}
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
