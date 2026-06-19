<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { AccountSituationResponse } from "../data/model/account-situation.model";

  let {
    open = $bindable(false),
    situations = [],
    onClose,
  }: {
    open?: boolean;
    situations?: AccountSituationResponse[];
    onClose?: () => void;
  } = $props();

  function handleClose() {
    open = false;
    onClose?.();
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Complete a sua conta</Dialog.Title>
      <Dialog.Description>
        A sua organização ainda precisa destes dados para aparecer nas pesquisas públicas.
      </Dialog.Description>
    </Dialog.Header>

    <div class="space-y-3">
      {#each situations as situation}
        <div class="rounded-md border p-3">
          <div class="text-sm font-medium">{situation.code}</div>
          <div class="text-sm text-muted-foreground">{situation.description}</div>
        </div>
      {/each}
    </div>

    <Dialog.Footer>
      <Button type="button" class="bg-brand" onclick={handleClose}>Entendi</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
