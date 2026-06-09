<script lang="ts">
  import type { OrgCatalogResponse } from "../data/model/catalog.model";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import TableActionsIcon from "$lib/components/table/table-actions-icon.svelte";
  import { Button } from "$lib/components/ui/button/index.js";

  let {
    item,
    onEdit,
    onEditImage,
    onDelete,
    onProducts,
  }: {
    item: OrgCatalogResponse;
    onEdit: () => void;
    onEditImage: () => void;
    onDelete: () => void;
    onProducts?: () => void;
  } = $props();
</script>

<div class="group relative rounded-sm border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow">
  <div class="relative overflow-hidden h-[150px] md:h-[160px] bg-muted">
    {#if item.imgUrl}
      <img
              src={item.imgUrl}
              alt={item.name}
              class="absolute inset-0 w-full h-full object-cover object-center"
      />
    {:else}
      <div class="flex items-center justify-center size-full text-muted-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
      </div>
    {/if}
  </div>
  <div class="p-4">
    <div class="flex items-start justify-between gap-2">
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold truncate">{item.name}</h3>
        <p class="text-sm text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Button {...props} variant="ghost" size="icon" class="size-8 shrink-0">
              <span class="sr-only">Open menu</span>
              <TableActionsIcon />
            </Button>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>Acções</DropdownMenu.Label>
            <DropdownMenu.Item onclick={onEdit}>Editar</DropdownMenu.Item>
            <DropdownMenu.Item onclick={onEditImage}>Editar imagem</DropdownMenu.Item>
            <DropdownMenu.Item onclick={onDelete} class="text-red-400">Eliminar</DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Group>
            <DropdownMenu.Label>Produto</DropdownMenu.Label>
            <DropdownMenu.Item onclick={onProducts}>Gerenciar</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </div>
</div>