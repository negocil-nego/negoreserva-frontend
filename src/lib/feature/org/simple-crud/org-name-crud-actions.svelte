<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import TableActionsIcon from "$lib/components/table/table-actions-icon.svelte";

  type Item = { uuid: string; name: string; description?: string | null };
  type FormAction = "create" | "update" | "delete";

  let {
    item,
    onAction,
  }: {
    item: Item;
    onAction: (item: Item, action: FormAction) => void;
  } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
        <span class="sr-only">Open menu</span>
        <TableActionsIcon />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Acoes</DropdownMenu.Label>
      <DropdownMenu.Item onclick={() => onAction(item, "update")} class="cursor-pointer">
        Editar
      </DropdownMenu.Item>
      <DropdownMenu.Item onclick={() => onAction(item, "delete")} class="text-red-400 cursor-pointer">
        Eliminar
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
