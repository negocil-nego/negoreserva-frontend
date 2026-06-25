<script lang="ts">
  import {
    DashboardService,
    type DashboardTotals,
    type DashboardPaymentByStatus,
    type DashboardPaymentByMethod,
    type DashboardCatalogWithProductCount,
  } from "$lib/feature/org/dashboard/data/service/dashboard.service";
  import PaymentDatatable from "$lib/feature/shared/payment/ui/table/payment-data-table.svelte";
  import PieTotalChart from "$lib/feature/org/dashboard/ui/pie-total-chart.svelte";
  import BarTotalChart from "$lib/feature/org/dashboard/ui/bar-total-chart.svelte";
  import BarCatalogChart from "$lib/feature/org/dashboard/ui/bar-catalog-chart.svelte";
  import BarPaymentsChart from "$lib/feature/org/dashboard/ui/bar-payments-chart.svelte";
  import PiePaymentsByStatus from "$lib/feature/org/dashboard/ui/pie-payments-by-status.svelte";

  let service = new DashboardService();

  let totals = $state<DashboardTotals | null>(null);
  let totalsLoading = $state(true);

  let paymentsByStatus = $state<DashboardPaymentByStatus[]>([]);
  let paymentsByMethod = $state<DashboardPaymentByMethod[]>([]);
  let catalogs = $state<DashboardCatalogWithProductCount[]>([]);

  $effect(() => {
    totalsLoading = true;
    Promise.all([
      service.getTotals(),
      service.getPaymentsByStatus(),
      service.getPaymentsByMethod(),
      service.getCatalogsWithProductCount(),
    ])
      .then(([t, s, m, c]) => {
        totals = t;
        paymentsByStatus = s;
        paymentsByMethod = m;
        catalogs = c;
      })
      .catch(console.error)
      .finally(() => {
        totalsLoading = false;
      });
  });

  const STATUS_LABEL: Record<string, string> = {
    PENDING: "Pendente",
    PAID: "Pago",
    CANCELED: "Cancelado",
    RECEIPT_VALID: "Comprovativo Válido",
  };

  const STATUS_COLOR: Record<string, string> = {
    PENDING: "var(--chart-1)",
    PAID: "var(--chart-2)",
    CANCELED: "var(--chart-3)",
    RECEIPT_VALID: "var(--chart-4)",
  };

  const METHOD_LABEL: Record<string, string> = {
    NONE: "Nenhum",
    RECEIPT: "Comprovativo",
    MULTCAIXA_EXPRESS: "Multicaixa Express",
    REFERENCIA: "Referência",
  };

  const METHOD_COLOR: Record<string, string> = {
    NONE: "var(--chart-1)",
    RECEIPT: "var(--chart-2)",
    MULTCAIXA_EXPRESS: "var(--chart-3)",
    REFERENCIA: "var(--chart-4)",
  };

  let statusPieData = $derived(
    paymentsByStatus.map((s, i) => ({
      key: s.paymentStatus,
      label: STATUS_LABEL[s.paymentStatus] ?? s.paymentStatus,
      value: s.count,
      color: STATUS_COLOR[s.paymentStatus] ?? `var(--chart-${i})`,
    })),
  );

  let methodPieData = $derived(
    paymentsByMethod.map((m, i) => ({
      key: m.paymentMethod,
      label: METHOD_LABEL[m.paymentMethod] ?? m.paymentMethod,
      value: m.count,
      color: METHOD_COLOR[m.paymentMethod] ?? `var(--chart-${i})`,
    })),
  );
</script>

<div class="space-y-2">
  <div>
    <h1 class="text-2xl font-bold tracking-tight">Painel</h1>
    <p class="text-muted-foreground text-sm mt-1">
      Visão geral da sua organização
    </p>
  </div>

  {#if totalsLoading}
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {#each Array.from({ length: 3 }) as index, i (i)}
        <div
          class="rounded-xl border bg-card text-card-foreground shadow-sm p-6 animate-pulse"
        >
          <div class="h-4 bg-muted rounded w-1/2 mb-3"></div>
          <div class="h-8 bg-muted rounded w-1/4">
            <span class="border-hidden">{index}</span>
          </div>
        </div>
      {/each}
    </div>
  {:else if totals}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <PieTotalChart
        catalog={totals.totalCatalogs}
        product={totals.totalProducts}
        payment={totals.totalPayments}
      />

      <BarTotalChart
        catalog={totals.totalCatalogs}
        product={totals.totalProducts}
        payment={totals.totalPayments}
      />
    </div>
  {/if}

  <BarCatalogChart items={catalogs} />

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <PiePaymentsByStatus
      data={statusPieData}
      title="Pagamentos por Estado"
      description="Distribuição dos pagamentos por estado"
      footerLabel="Quantidade de pagamentos por estado"
    />
    <PiePaymentsByStatus
      data={methodPieData}
      title="Pagamentos por Método"
      description="Distribuição dos pagamentos por método"
      footerLabel="Quantidade de pagamentos por método"
    />
  </div>

  <BarPaymentsChart />

  <PaymentDatatable hideActions hideFilters hidePagination />
</div>
