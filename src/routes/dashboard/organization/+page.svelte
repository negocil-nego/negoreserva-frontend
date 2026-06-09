<script lang="ts">
  import { DashboardService, type DashboardTotals, type DashboardPaymentByStatus, type DashboardPaymentByMethod, type DashboardCatalogWithProductCount } from "$lib/feature/org/dashboard/data/service/dashboard.service";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import CatalogDataTable from "$lib/feature/org/catalog/ui/catalog-data-table.svelte";
  import ProductDatatable from "$lib/feature/org/product/ui/table/product-data-table.svelte";
  import PaymentDatatable from "$lib/feature/shared/payment/ui/table/payment-data-table.svelte";

  let service = new DashboardService();

  let totals = $state<DashboardTotals | null>(null);
  let totalsLoading = $state(true);

  let paymentsByStatus = $state<DashboardPaymentByStatus[]>([]);
  let paymentsByMethod = $state<DashboardPaymentByMethod[]>([]);
  let catalogsWithCount = $state<DashboardCatalogWithProductCount[]>([]);

  $effect(() => {
    totalsLoading = true;
    Promise.all([
      service.getTotals(),
      service.getPaymentsByStatus(),
      service.getPaymentsByMethod(),
      service.getCatalogsWithProductCount(),
    ]).then(([t, s, m, c]) => {
      totals = t;
      paymentsByStatus = s;
      paymentsByMethod = m;
      catalogsWithCount = c;
    }).catch(console.error).finally(() => {
      totalsLoading = false;
    });
  });

  const STATUS_COLOR: Record<string, string> = {
    PENDING: "bg-amber-500",
    PAID: "bg-green-500",
    CANCELED: "bg-red-500",
    RECEIPT_VALID: "bg-blue-500",
  };

  const STATUS_LABEL: Record<string, string> = {
    PENDING: "Pendente",
    PAID: "Pago",
    CANCELED: "Cancelado",
    RECEIPT_VALID: "Comprovativo Válido",
  };

  const METHOD_COLOR: Record<string, string> = {
    NONE: "bg-gray-400",
    RECEIPT: "bg-blue-500",
    MULTCAIXA_EXPRESS: "bg-teal-500",
    REFERENCIA: "bg-purple-500",
  };

  const METHOD_LABEL: Record<string, string> = {
    NONE: "Nenhum",
    RECEIPT: "Comprovativo",
    MULTCAIXA_EXPRESS: "Multicaixa Express",
    REFERENCIA: "Referência",
  };

  let maxStatusCount = $derived(paymentsByStatus.length > 0 ? Math.max(...paymentsByStatus.map(s => s.count)) : 1);
  let maxMethodCount = $derived(paymentsByMethod.length > 0 ? Math.max(...paymentsByMethod.map(m => m.count)) : 1);
  let maxProductCount = $derived(catalogsWithCount.length > 0 ? Math.max(...catalogsWithCount.map(c => c.productCount)) : 1);
</script>

<div class="p-6 space-y-6">
  <div>
    <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1>
    <p class="text-muted-foreground text-sm mt-1">Visão geral da sua organização</p>
  </div>

  {#if totalsLoading}
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {#each Array(3) as _}
        <div class="rounded-xl border bg-card text-card-foreground shadow-sm p-6 animate-pulse">
          <div class="h-4 bg-muted rounded w-1/2 mb-3"></div>
          <div class="h-8 bg-muted rounded w-1/4"></div>
        </div>
      {/each}
    </div>
  {:else if totals}
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <p class="text-sm text-muted-foreground">Produtos</p>
        <p class="text-3xl font-bold mt-1">{totals.totalProducts}</p>
      </div>
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <p class="text-sm text-muted-foreground">Pagamentos</p>
        <p class="text-3xl font-bold mt-1">{totals.totalPayments}</p>
      </div>
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <p class="text-sm text-muted-foreground">Catálogos</p>
        <p class="text-3xl font-bold mt-1">{totals.totalCatalogs}</p>
      </div>
    </div>
  {/if}

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {#if paymentsByStatus.length > 0}
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <p class="text-sm font-semibold text-muted-foreground mb-4">Pagamentos por Estado</p>
        <div class="space-y-3">
          {#each paymentsByStatus as item}
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>{STATUS_LABEL[item.paymentStatus] ?? item.paymentStatus}</span>
                <span class="font-medium">{item.count}</span>
              </div>
              <div class="h-2 bg-muted rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all {STATUS_COLOR[item.paymentStatus] ?? 'bg-brand'}" style="width: {(item.count / maxStatusCount) * 100}%"></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if paymentsByMethod.length > 0}
      <div class="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <p class="text-sm font-semibold text-muted-foreground mb-4">Pagamentos por Método</p>
        <div class="space-y-3">
          {#each paymentsByMethod as item}
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>{METHOD_LABEL[item.paymentMethod] ?? item.paymentMethod}</span>
                <span class="font-medium">{item.count}</span>
              </div>
              <div class="h-2 bg-muted rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all {METHOD_COLOR[item.paymentMethod] ?? 'bg-brand'}" style="width: {(item.count / maxMethodCount) * 100}%"></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if catalogsWithCount.length > 0}
    <div class="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
      <p class="text-sm font-semibold text-muted-foreground mb-4">Catálogos por Produtos</p>
      <div class="space-y-3">
        {#each catalogsWithCount as item}
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span class="font-medium">{item.productCount} produto(s)</span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all {item.productCount > 0 ? 'bg-brand' : 'bg-gray-300'}" style="width: {maxProductCount > 0 ? (item.productCount / maxProductCount) * 100 : 0}%"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <Tabs.Root value="pagamentos">
    <Tabs.List class="mb-4">
      <Tabs.Trigger value="pagamentos">Pagamentos</Tabs.Trigger>
      <Tabs.Trigger value="produtos">Produtos</Tabs.Trigger>
      <Tabs.Trigger value="catalogos">Catálogos</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="pagamentos">
      <PaymentDatatable hideActions hideFilters hidePagination />
    </Tabs.Content>

    <Tabs.Content value="produtos">
      <ProductDatatable hideActions hideFilters hidePagination />
    </Tabs.Content>

    <Tabs.Content value="catalogos">
      <CatalogDataTable />
    </Tabs.Content>
  </Tabs.Root>
</div>
