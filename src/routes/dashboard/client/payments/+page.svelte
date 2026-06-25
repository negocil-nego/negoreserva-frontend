<script lang="ts">
  import ClientPaymentDataTable from "$lib/feature/client/ui/table/client-payment-data-table.svelte";
</script>

<div class="p-6 space-y-6">
  <div>
    <h1 class="text-2xl font-bold tracking-tight text-foreground">Histórico de Pagamentos</h1>
    <p class="text-muted-foreground text-sm mt-1">Consulte todos os seus pagamentos e transações efetuadas.</p>
  </div>

  <div class="border border-border bg-card p-6 shadow-sm">
    <ClientPaymentDataTable />
  </div>
</div>
