<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import type { CategoryResponse } from "../../../../shared/category/model/category.model";
  import type { CategoryFormAction } from "../form/category-form.svelte";
  import TableActionsIcon from "$lib/components/table/table-actions-icon.svelte";

  let {
    category,
    onAction,
  }: {
    onAction: (category: CategoryResponse, action: CategoryFormAction) => void;
    category: CategoryResponse;
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
      <DropdownMenu.Item onclick={() => onAction(category, "update")}>
        Editar
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onclick={() => onAction(category, "delete")}
        class="text-red-400"
      >
        Eliminar
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
