<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import type { PersonResponse } from "../../data/model/person.model";
  import type { PersonFormAction } from "../form/person-form.svelte";
  import TableActionsIcon from "$lib/components/table/table-actions-icon.svelte";

  let {
    person,
    onAction,
  }: {
    onAction: (person: PersonResponse, action: PersonFormAction) => void;
    person: PersonResponse;
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
      <DropdownMenu.Item onclick={() => onAction(person, "update")}>
        Editar
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onclick={() => onAction(person, "delete")}
        class="text-red-400"
      >
        Eliminar
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>