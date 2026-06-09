<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import TableActionsIcon from "$lib/components/table/table-actions-icon.svelte";

  type Person = {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    birthday?: string | null;
  };
  type PersonAction = "update" | "delete";

  let {
    person,
    onAction,
  }: {
    person: Person;
    onAction: (person: Person, action: PersonAction) => void;
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
      <DropdownMenu.Item onclick={() => onAction(person, "update")} class="cursor-pointer">
        Editar
      </DropdownMenu.Item>
      <DropdownMenu.Item onclick={() => onAction(person, "delete")} class="text-red-400 cursor-pointer">
        Eliminar
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
