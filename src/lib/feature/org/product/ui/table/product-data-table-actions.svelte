<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import type { OrgProductResponse } from "../../data/model/product.model";
  import type { ProductFormAction } from "../../data/model/product.form";
  import TableActionsIcon from "$lib/components/table/table-actions-icon.svelte";
  import { resolve } from "$app/paths";

  let {
    product,
    onAction,
  }: {
    onAction: (product: OrgProductResponse, action: ProductFormAction) => void;
    product: OrgProductResponse;
  } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="ghost"
        size="icon"
        class="relative size-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <TableActionsIcon />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Acções</DropdownMenu.Label>
      <a href={resolve(`/dashboard/organization/products/edit/${product.slug}`)} class="w-full text-foreground hover:no-underline">
        <DropdownMenu.Item class="cursor-pointer">
          Editar
        </DropdownMenu.Item>
      </a>
      <DropdownMenu.Item
        onclick={() => onAction(product, "delete")}
        class="text-red-400 cursor-pointer"
      >
        Eliminar
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
