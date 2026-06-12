<script lang="ts">
  import { OrgCatalogService } from "../data/service/catalog.service";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import { ORG_CATALOG_FILTER } from "../data/hooks/keys";
  import type { OrgProductResponse } from "$lib/feature/org/product/data/model/product.model";
  import { catalogProductStore } from "$lib/stores/catalog-product.store";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let {
    uuidOrSlug,
  }: {
    uuidOrSlug: string;
  } = $props();

  let service = new OrgCatalogService();
  const queryClient = useQueryClient();

  let filterAdd = $state({ pageNumber: 0, pageSize: 100 });
  let filterList = $state({ pageNumber: 0, pageSize: 100 });

  let productsIn = $state<OrgProductResponse[]>([]);
  let productsNotIn = $state<OrgProductResponse[]>([]);
  let isLoadingIn = $state(false);
  let isLoadingNotIn = $state(false);
  let isSavingAdd = $state(false);
  let isSavingRemove = $state(false);

  let addStore = catalogProductStore.add;
  let removeStore = catalogProductStore.remove;
  let addSelected = $derived($addStore);
  let removeSelected = $derived($removeStore);

  async function loadProductsIn() {
    isLoadingIn = true;
    try {
      const result = await service.paginateCatalogProducts(uuidOrSlug, filterList);
      productsIn = result.content ?? [];
    } catch (e) {
      console.error("Erro ao carregar produtos do catálogo:", e);
    } finally {
      isLoadingIn = false;
    }
  }

  async function loadProductsNotIn() {
    isLoadingNotIn = true;
    try {
      const result = await service.paginateCatalogProductsNotIn(uuidOrSlug, filterAdd);
      productsNotIn = result.content ?? [];
    } catch (e) {
      console.error("Erro ao carregar produtos fora do catálogo:", e);
    } finally {
      isLoadingNotIn = false;
    }
  }

  function isSelectedAdd(uuid: string) {
    return addSelected.some((i) => i.productUuid === uuid);
  }

  function isSelectedRemove(uuid: string) {
    return removeSelected.some((i) => i.productUuid === uuid);
  }

  async function handleSaveAdd() {
    if (addSelected.length === 0) return;
    isSavingAdd = true;
    try {
      await service.addProductsToCatalog(uuidOrSlug, addSelected.map((i) => ({ productUuid: i.productUuid, order: i.order })));
      catalogProductStore.add.clear();
      queryClient.invalidateQueries([ORG_CATALOG_FILTER]);
      await Promise.all([loadProductsIn(), loadProductsNotIn()]);
    } catch (e) {
      console.error("Erro ao adicionar produtos:", e);
    } finally {
      isSavingAdd = false;
    }
  }

  async function handleSaveRemove() {
    if (removeSelected.length === 0) return;
    isSavingRemove = true;
    try {
      await service.removeProductsFromCatalog(uuidOrSlug, removeSelected.map((i) => i.productUuid));
      catalogProductStore.remove.clear();
      queryClient.invalidateQueries([ORG_CATALOG_FILTER]);
      await Promise.all([loadProductsIn(), loadProductsNotIn()]);
    } catch (e) {
      console.error("Erro ao remover produtos:", e);
    } finally {
      isSavingRemove = false;
    }
  }

  $effect(() => {
    loadProductsIn();
    loadProductsNotIn();
  });
</script>

<div class="space-y-6 relative">
  <Tabs.Root value="listar">
    <Tabs.List class="mb-4">
      <Tabs.Trigger value="listar">Listar</Tabs.Trigger>
      <Tabs.Trigger value="adicionar">Adicionar</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="listar">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Produtos no catálogo</h2>
          <Button
            onclick={handleSaveRemove}
            disabled={isSavingRemove || removeSelected.length === 0}
            variant="destructive"
            class="rounded-sm md:absolute md:right-0 md:top-0"
          >
            {isSavingRemove ? "A remover..." : "Remover selecionados"}
          </Button>
        </div>

        {#if isLoadingIn}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {#each Array.from({ length: 4 }, (_, i) => i) as i (i)}
              <div class="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div class="aspect-video bg-muted animate-pulse"></div>
                <div class="p-4 space-y-2">
                  <div class="h-5 bg-muted animate-pulse rounded w-3/4"></div>
                  <div class="h-4 bg-muted animate-pulse rounded w-full"></div>
                </div>
              </div>
            {/each}
          </div>
        {:else if productsIn.length === 0}
          <div class="flex flex-col items-center justify-center py-16 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-muted-foreground mb-4"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            <h3 class="text-lg font-semibold">Nenhum produto no catálogo</h3>
            <p class="text-muted-foreground text-sm mt-1">Adicione produtos através do separador "Adicionar".</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {#each productsIn as product (product.uuid)}
              <button
                onclick={() => catalogProductStore.remove.toggle(product.uuid)}
                class="rounded-sm border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow text-left cursor-pointer"
                class:ring-2={isSelectedRemove(product.uuid)}
                class:ring-red-500={isSelectedRemove(product.uuid)}
              >
                <div class="aspect-video bg-muted relative overflow-hidden">
                  {#if product.files && product.files.length > 0}
                    <img src={product.files[0].url} alt={product.name} class="size-full object-cover" />
                  {:else}
                    <div class="flex items-center justify-center size-full text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                    </div>
                  {/if}
                  {#if isSelectedRemove(product.uuid)}
                    <div class="absolute top-2 right-2 size-6 bg-red-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M5 12h14"/></svg>
                    </div>
                  {/if}
                </div>
                <div class="p-4">
                  <h3 class="font-semibold truncate">{product.name}</h3>
                  <p class="text-sm text-muted-foreground line-clamp-2 mt-0.5">{product.description}</p>
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </Tabs.Content>

    <Tabs.Content value="adicionar">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Adicionar produtos</h2>
          <Button
            onclick={handleSaveAdd}
            disabled={isSavingAdd || addSelected.length === 0}
            class="rounded-sm bg-brand text-white hover:bg-brand/90 md:absolute md:right-0 md:top-0"
          >
            {isSavingAdd ? "A guardar..." : "Guardar selecionados"}
          </Button>
        </div>

        {#if isLoadingNotIn}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {#each Array.from({ length: 4 }, (_, i) => i) as i (i)}
              <div class="rounded-sm border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div class="aspect-video bg-muted animate-pulse"></div>
                <div class="p-4 space-y-2">
                  <div class="h-5 bg-muted animate-pulse rounded w-3/4"></div>
                  <div class="h-4 bg-muted animate-pulse rounded w-1/2"></div>
                </div>
              </div>
            {/each}
          </div>
        {:else if productsNotIn.length === 0}
          <div class="flex flex-col items-center justify-center py-16 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-muted-foreground mb-4"><path d="M12 5v14M5 12h14"/></svg>
            <h3 class="text-lg font-semibold">Todos os produtos já estão no catálogo</h3>
            <p class="text-muted-foreground text-sm mt-1">Não há produtos disponíveis para adicionar.</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {#each productsNotIn as product (product.uuid)}
              <div
                class="rounded-sm border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                class:ring-2={isSelectedAdd(product.uuid)}
                class:ring-brand={isSelectedAdd(product.uuid)}
              >
                <button
                  onclick={() => catalogProductStore.add.toggle(product.uuid)}
                  class="w-full text-left cursor-pointer"
                >
                  <div class="aspect-video bg-muted relative overflow-hidden">
                    {#if product.files && product.files.length > 0}
                      <img src={product.files[0].url} alt={product.name} class="size-full object-cover" />
                    {:else}
                      <div class="flex items-center justify-center size-full text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                      </div>
                    {/if}
                    {#if isSelectedAdd(product.uuid)}
                      <div class="absolute top-2 right-2 size-6 bg-brand rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                      </div>
                    {/if}
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold truncate">{product.name}</h3>
                    <p class="text-sm text-muted-foreground line-clamp-2 mt-0.5">{product.description}</p>
                  </div>
                </button>
                {#if isSelectedAdd(product.uuid)}
                  <div class="px-4 pb-4">
                    <label for={`catalog-order-${product.uuid}`} class="text-xs text-muted-foreground block mb-1">Ordem</label>
                    <input
                      id={`catalog-order-${product.uuid}`}
                      type="number"
                      min="1"
                      value={addSelected.find((i) => i.productUuid === product.uuid)?.order ?? 1}
                      oninput={(e) => {
                        const val = parseInt(e.currentTarget.value, 10);
                        if (!isNaN(val) && val >= 1) {
                          catalogProductStore.add.updateOrder(product.uuid, val);
                        }
                      }}
                      class="flex h-9 w-20 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                    />
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </Tabs.Content>
  </Tabs.Root>
</div>
