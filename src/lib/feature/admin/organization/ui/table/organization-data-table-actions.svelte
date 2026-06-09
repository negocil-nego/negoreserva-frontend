<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import type { OrganizationResponse } from "../../data/model/organization.model";
  import type { OrganizationFormAction } from "../form/organization-form.svelte";
  import TableActionsIcon from "$lib/components/table/table-actions-icon.svelte";

  let {
    organization,
    onAction,
  }: {
    onAction: (organization: OrganizationResponse, action: OrganizationFormAction) => void;
    organization: OrganizationResponse;
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
      <DropdownMenu.Item onclick={() => onAction(organization, "update")}>
        Editar
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onclick={() => onAction(organization, "delete")}
        class="text-red-400"
      >
        Eliminar
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>