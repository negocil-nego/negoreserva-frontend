<script lang="ts">
  import { PaymentMethod } from "../../data/model/payment.model";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  let {
    transactionUuid: initialTransactionUuid,
    selectedMethod = PaymentMethod.RECEIPT,
    onSave,
    isLoading = false,
  }: {
    transactionUuid: string | null;
    selectedMethod?: PaymentMethod;
    onSave: (request: { transactionUuid: string; type: PaymentMethod }) => void;
    isLoading?: boolean;
  } = $props();

  let localMethod = $state<PaymentMethod>(selectedMethod);
  let localTransactionUuid = $state(initialTransactionUuid ?? "");
</script>

<div class="space-y-6">
  <div class="space-y-2">
    <Label for="transactionUuid">Transação</Label>
    <Input
      id="transactionUuid"
      bind:value={localTransactionUuid}
      disabled
      placeholder="UUID da transação"
    />
  </div>

  <div class="space-y-2">
    <Label>Método de Pagamento</Label>
    <Select.Root
      type="single"
      value={localMethod}
      onValueChange={(v) => (localMethod = v as PaymentMethod)}
    >
      <Select.Trigger>
        {localMethod}
      </Select.Trigger>
      <Select.Content>
        <Select.Item value={PaymentMethod.RECEIPT}>Comprovativo</Select.Item>
        <Select.Item value={PaymentMethod.MULTICAIXA_EXPRESS}>Multicaixa Express</Select.Item>
        <Select.Item value={PaymentMethod.REFERENCIA}>Referência</Select.Item>
      </Select.Content>
    </Select.Root>
  </div>

  <Button
    disabled={!localTransactionUuid || isLoading}
    onclick={() => {
      onSave({ transactionUuid: localTransactionUuid, type: localMethod });
    }}
  >
    {isLoading ? "A salvar..." : "Salvar Pagamento"}
  </Button>
</div>
