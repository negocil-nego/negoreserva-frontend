<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import type { OrgPaymentResponse } from "../../data/model/payment.model";
  import TableActionsIcon from "$lib/components/table/table-actions-icon.svelte";
  import { goto } from "$app/navigation";

  let {
    payment,
    onValidate,
    onDelete,
  }: {
    payment: OrgPaymentResponse;
    onValidate?: (payment: OrgPaymentResponse) => void;
    onDelete?: (payment: OrgPaymentResponse) => void;
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
      {#if payment.status === "PENDING" && payment.paymentFileReceipt}
        <DropdownMenu.Item
          onclick={() => onValidate?.(payment)}
          class="cursor-pointer"
        >
          Validar
        </DropdownMenu.Item>
      {/if}
      <DropdownMenu.Item
        onclick={() => goto(`/dashboard/payments/${payment.uuid}/detail`)}
        class="cursor-pointer"
      >
        Detalhe
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onclick={() => onDelete?.(payment)}
        class="text-red-400 cursor-pointer"
      >
        Eliminar
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
