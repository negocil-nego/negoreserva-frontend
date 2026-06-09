<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import type { ProductFileResponse } from "../../data/model/productfile.model";
  import type { ProductFileFormAction } from "../form/productfile-form.svelte";
  import TableActionsIcon from "$lib/components/table/table-actions-icon.svelte";

  let {
    productfile,
    onAction,
  }: {
    onAction: (productfile: ProductFileResponse, action: ProductFileFormAction) => void;
    productfile: ProductFileResponse;
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
      <DropdownMenu.Item onclick={() => onAction(productfile, "update")}>
        Editar
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onclick={() => onAction(productfile, "delete")}
        class="text-red-400"
      >
        Eliminar
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>