<script lang="ts">
  import { goto } from "$app/navigation";
  import { useOrgGetCatalogFilterPaginate } from "../data/hooks/use-get-filter-paginate";
  import { useOrgDeleteCatalog } from "../data/hooks/use-delete";
  import type { CatalogFilterQueryParamInput } from "../data/contract/catalog.repo";
  import type { OrgCatalogResponse } from "../data/model/catalog.model";

  import { OrgCatalogService } from "../data/service/catalog.service";
  import CatalogImageEditDialog from "./catalog-image-edit-dialog.svelte";
  import CatalogCreateDialog from "./catalog-create-dialog.svelte";
  import CatalogEditDialog from "./catalog-edit-dialog.svelte";
  import CatalogCard from "./catalog-card.svelte";

  let service = new OrgCatalogService();

  let filter = $state<CatalogFilterQueryParamInput>({
    pageNumber: 0,
    pageSize: 100,
  });

  let baseQuery = $derived(
    useOrgGetCatalogFilterPaginate({
      service,
      filter,
    }),
  );

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data?.content ?? []);

  let showCreateDialog = $state(false);
  let editItem = $state<OrgCatalogResponse | null>(null);
  let editImageItem = $state<OrgCatalogResponse | null>(null);

  let deleteMutation = useOrgDeleteCatalog({ service });

  function handleEdit(item: OrgCatalogResponse) {
    editItem = item;
  }

  function handleEditImage(item: OrgCatalogResponse) {
    editImageItem = item;
  }

  function handleDelete(item: OrgCatalogResponse) {
    if (!confirm(`Tem certeza que deseja eliminar o catálogo "${item.name}"?`)) return;
    $deleteMutation.mutate({ uuid: item.uuid });
  }

  function handleProducts(item: OrgCatalogResponse) {
    goto(`/dashboard/organization/catalog/${item.slug}/products`);
  }
</script>

<div class="p-6">
  <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Catálogos</h1>
      <p class="text-muted-foreground text-sm mt-1">
        Gerencie os catálogos de produtos da sua organização
      </p>
    </div>
    <button
      class="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90 transition-colors cursor-pointer"
      onclick={() => (showCreateDialog = true)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1.5"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      Novo Catálogo
    </button>
  </div>

  {#if isLoading}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each Array(4) as _}
        <div class="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div class="aspect-video bg-muted animate-pulse"></div>
          <div class="p-4 space-y-2">
            <div class="h-5 bg-muted animate-pulse rounded w-3/4"></div>
            <div class="h-4 bg-muted animate-pulse rounded w-full"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else if items.length === 0}
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-muted-foreground mb-4"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
      <h3 class="text-lg font-semibold">Nenhum catálogo encontrado</h3>
      <p class="text-muted-foreground text-sm mt-1">Crie seu primeiro catálogo para começar.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each items as item}
        <CatalogCard
          {item}
          onEdit={() => handleEdit(item)}
          onEditImage={() => handleEditImage(item)}
          onDelete={() => handleDelete(item)}
          onProducts={() => handleProducts(item)}
        />
      {/each}
    </div>
  {/if}
</div>

<CatalogCreateDialog
  bind:open={showCreateDialog}
  onSuccess={() => { showCreateDialog = false; }}
/>

<CatalogEditDialog
  item={editItem}
  onSuccess={() => { editItem = null;  }}
  onClose={() => { editItem = null; }}
/>

<CatalogImageEditDialog
  item={editImageItem}
  onSuccess={() => { editImageItem = null; }}
  onClose={() => { editImageItem = null; }}
/>
