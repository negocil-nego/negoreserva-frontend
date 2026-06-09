<script lang="ts">
  import {page} from "$app/state";
  import { OrgPaymentService } from "$lib/feature/shared/payment/data/service/payment.service";
  import { useFindByUuidPayment } from "$lib/feature/shared/payment/data/hooks/use-find-by-uuid";
  import PaymentDetail from "$lib/feature/shared/payment/ui/detail/payment-detail.svelte";

  const paymentQuery = useFindByUuidPayment({
    service: new OrgPaymentService(),
    get uuid() {
      return page.params.uuid ?? ""
    }
  });

  let payment = $derived($paymentQuery.data);
  let isLoading = $derived($paymentQuery.isFetching);
</script>

<div class="p-6">
  {#if isLoading}
    <div class="flex h-64 items-center justify-center">
      <span class="text-muted-foreground animate-pulse text-sm">Carregando pagamento...</span>
    </div>
  {:else if payment}
    <PaymentDetail {payment} />
  {:else}
    <div class="flex h-64 items-center justify-center">
      <span class="text-sm text-red-500">Pagamento não encontrado.</span>
    </div>
  {/if}
</div>
