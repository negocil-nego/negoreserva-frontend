<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import type { PlanResponse } from "../../data/model/plan.model";
  import type { PlanFormAction } from "../form/plan-form.svelte";
  import TableActionsIcon from "$lib/components/table/table-actions-icon.svelte";

  let {
    plan,
    onAction,
  }: {
    onAction: (plan: PlanResponse, action: PlanFormAction) => void;
    plan: PlanResponse;
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
      <DropdownMenu.Item onclick={() => onAction(plan, "update")}>
        Editar
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onclick={() => onAction(plan, "delete")}
        class="text-red-400"
      >
        Eliminar
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>