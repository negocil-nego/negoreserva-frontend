<script lang="ts">
  import { OrgPaymentService } from "$lib/feature/shared/payment/data/service/payment.service";
  import { useOrgGetPaymentFilterPaginate } from "$lib/feature/shared/payment/data/hooks/use-get-filter-paginate";
  import { userAuthStore } from "$lib/stores/user-auth.store";
  import { PaymentStatus, PaymentMethod } from "$lib/feature/shared/payment/data/model/payment.model";
  import DollarSign from "@lucide/svelte/icons/dollar-sign";
  import CreditCard from "@lucide/svelte/icons/credit-card";
  import Activity from "@lucide/svelte/icons/activity";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import Calendar from "@lucide/svelte/icons/calendar";

  const service = new OrgPaymentService();
  const baseQuery = useOrgGetPaymentFilterPaginate({
    service,
    filter: {
      field: "ALL",
      search: "",
      pageNumber: 0,
      pageSize: 100, // Fetch recent payments
    },
  });

  let user = $derived(userAuthStore.getUserAuthResponse());
  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let rawPayments = $derived($baseQuery?.data?.content ?? []);

  // Filter payments for this client
  let clientPayments = $derived(
    rawPayments.filter((p) => p.transaction?.user?.email === user?.email)
  );

  // Stats calculations
  let totalSpent = $derived(
    clientPayments
      .filter((p) => p.status === PaymentStatus.PAID || p.status === PaymentStatus.RECEIPT_VALID)
      .reduce((sum, p) => sum + (p.transaction?.price ?? 0), 0)
  );

  let totalPending = $derived(
    clientPayments
      .filter((p) => p.status === PaymentStatus.PENDING)
      .reduce((sum, p) => sum + (p.transaction?.price ?? 0), 0)
  );

  let recentPayments = $derived(clientPayments.slice(0, 5));

  // Activity chart data (Mock base data with fallback, combined with actual payment amounts if any)
  let monthlyActivity = $derived.by(() => {
    const base = [
      { month: "Jan", amount: 15000 },
      { month: "Fev", amount: 25000 },
      { month: "Mar", amount: 18000 },
      { month: "Abr", amount: 42000 },
      { month: "Mai", amount: 35000 },
      { month: "Jun", amount: 55000 },
    ];
    
    // If client has paid transactions, we can adjust the last month's data to reflect their actual total spent
    if (totalSpent > 0) {
      base[base.length - 1].amount = totalSpent;
    }
    return base;
  });

  let maxAmount = $derived(Math.max(...monthlyActivity.map((d) => d.amount), 1000));

  // SVG Chart path calculation
  let svgPath = $derived.by(() => {
    const width = 500;
    const height = 150;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const points = monthlyActivity.map((d, i) => {
      const x = padding + (i / (monthlyActivity.length - 1)) * chartWidth;
      const y = padding + chartHeight - (d.amount / maxAmount) * chartHeight;
      return { x, y };
    });

    if (points.length === 0) return "";
    
    // Draw smooth cubic curves between coordinates
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return path;
  });

  let svgFillPath = $derived.by(() => {
    if (!svgPath) return "";
    const width = 500;
    const height = 150;
    const padding = 20;
    return `${svgPath} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;
  });

  const STATUS_LABEL: Record<string, string> = {
    PENDING: "Pendente",
    PAID: "Pago",
    CANCELED: "Cancelado",
    RECEIPT_VALID: "Comprovativo Válido",
  };

  const STATUS_CLASSES: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200/50",
    PAID: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200/50",
    CANCELED: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200/50",
    RECEIPT_VALID: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200/50",
  };

  // Hover state for chart points
  let hoveredPoint = $state<number | null>(null);
</script>

<div class="p-6 space-y-6">
  <!-- Top Welcome Header -->
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-foreground bg-clip-text">Painel do Cliente</h1>
      <p class="text-muted-foreground text-sm mt-1">Bem-vindo de volta, <span class="font-semibold text-foreground">{user?.name ?? "Cliente"}</span>!</p>
    </div>
    <div class="flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border px-3 py-1.5 w-fit">
      <Calendar class="size-4 text-brand" />
      <span>{new Date().toLocaleDateString('pt-AO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="border border-border bg-card text-card-foreground shadow-sm p-6 flex items-center justify-between transition-all hover:shadow-md">
      <div class="space-y-1">
        <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Investido</p>
        <p class="text-2xl font-bold mt-1">
          {totalSpent.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA', minimumFractionDigits: 2 })}
        </p>
      </div>
      <div class="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
        <DollarSign class="size-6" />
      </div>
    </div>

    <div class="border border-border bg-card text-card-foreground shadow-sm p-6 flex items-center justify-between transition-all hover:shadow-md">
      <div class="space-y-1">
        <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pendente</p>
        <p class="text-2xl font-bold mt-1 text-amber-600 dark:text-amber-400">
          {totalPending.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA', minimumFractionDigits: 2 })}
        </p>
      </div>
      <div class="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
        <CreditCard class="size-6" />
      </div>
    </div>

    <div class="border border-border bg-card text-card-foreground shadow-sm p-6 flex items-center justify-between transition-all hover:shadow-md">
      <div class="space-y-1">
        <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total de Transações</p>
        <p class="text-2xl font-bold mt-1">{clientPayments.length}</p>
      </div>
      <div class="p-3 bg-brand/10 text-brand">
        <Activity class="size-6" />
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
    <!-- Activity Chart (Left / Spans 3 columns) -->
    <div class="lg:col-span-3 border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-md font-bold text-foreground">Atividade Financeira</h2>
          <p class="text-xs text-muted-foreground">Evolução do valor investido nos últimos meses</p>
        </div>
        <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-full flex items-center gap-1">
          <ArrowUpRight class="size-3" /> +12.5%
        </span>
      </div>

      <!-- Responsive SVG Line Chart -->
      <div class="relative w-full h-44 flex items-center justify-center">
        <svg viewBox="0 0 500 150" class="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--color-brand, #0d9488)" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="var(--color-brand, #0d9488)" stop-opacity="0.0"/>
            </linearGradient>
          </defs>

          <!-- Grid Lines -->
          {#each Array(4) as _, i}
            <line 
              x1="20" 
              y1={20 + i * 36} 
              x2="480" 
              y2={20 + i * 36} 
              class="stroke-border/40" 
              stroke-width="1"
              stroke-dasharray="4"
            />
          {/each}

          <!-- Gradient area below line -->
          {#if svgFillPath}
            <path d={svgFillPath} fill="url(#chartGradient)" />
          {/if}

          <!-- Line Stroke -->
          {#if svgPath}
            <path d={svgPath} fill="none" class="stroke-brand" stroke-width="3" stroke-linecap="round" />
          {/if}

          <!-- Interactive Dots -->
          {#each monthlyActivity as d, i}
            {@const x = 20 + (i / (monthlyActivity.length - 1)) * 460}
            {@const y = 20 + 110 - (d.amount / maxAmount) * 110}
            <!-- Transparent hover zone -->
            <circle
              cx={x}
              cy={y}
              r="12"
              fill="transparent"
              class="cursor-pointer"
              role="presentation"
              onmouseenter={() => hoveredPoint = i}
              onmouseleave={() => hoveredPoint = null}
            />
            <!-- Visual Dot -->
            <circle
              cx={x}
              cy={y}
              r={hoveredPoint === i ? "6" : "4"}
              class="fill-brand stroke-background transition-all"
              stroke-width="2"
              pointer-events="none"
            />
          {/each}
        </svg>

        <!-- Tooltip overlay -->
        {#if hoveredPoint !== null}
          {@const active = monthlyActivity[hoveredPoint]}
          <div 
            class="absolute bg-card border border-border shadow-lg px-2.5 py-1.5 text-xs z-10 transition-all pointer-events-none"
            style="left: {15 + (hoveredPoint / (monthlyActivity.length - 1)) * 72}%; bottom: 65%; transform: translateX(-50%);"
          >
            <p class="font-bold text-foreground">{active.month}</p>
            <p class="text-muted-foreground">{active.amount.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA', minimumFractionDigits: 0 })}</p>
          </div>
        {/if}
      </div>

      <!-- X-Axis Labels -->
      <div class="flex justify-between px-4 text-xs font-semibold text-muted-foreground border-t border-border/40 pt-3">
        {#each monthlyActivity as d (d.month)}
          <span>{d.month}</span>
        {/each}
      </div>
    </div>

    <!-- Recent Payments (Right / Spans 2 columns) -->
    <div class="lg:col-span-2 border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-md font-bold text-foreground">Últimas Transações</h2>
          <a href="/dashboard/client/payments" class="text-xs font-semibold text-brand hover:underline">Ver todas</a>
        </div>

        {#if isLoading}
          <div class="space-y-4">
            {#each Array(3) as _, i (i)}
              <div class="flex items-center gap-3 animate-pulse">
                <div class="size-10 bg-muted "></div>
                <div class="space-y-1 flex-1">
                  <div class="h-3 bg-muted rounded w-3/4"></div>
                  <div class="h-2.5 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            {/each}
          </div>
        {:else if recentPayments.length === 0}
          <div class="flex flex-col items-center justify-center h-44 text-center">
            <p class="text-sm text-muted-foreground">Nenhum pagamento efetuado.</p>
          </div>
        {:else}
          <div class="space-y-3.5">
            {#each recentPayments as p (p.uuid)}
              <div class="flex items-center justify-between p-2 hover:bg-muted/30 transition-all border border-transparent hover:border-border/30">
                <div class="flex items-center gap-3">
                  <div class="size-10 bg-brand/10 text-brand flex items-center justify-center font-bold text-sm">
                    {p.transaction?.product?.name ? p.transaction.product.name.substring(0,2).toUpperCase() : "TX"}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-foreground truncate max-w-[120px]">{p.transaction?.product?.name ?? "Produto"}</p>
                    <p class="text-[10px] text-muted-foreground">{p.transaction?.code ?? "Código"}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold text-foreground">
                    {p.transaction?.price ? p.transaction.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA', minimumFractionDigits: 2 }) : "AOA 0,00"}
                  </p>
                  <span class="inline-block text-[9px] px-1.5 py-0.5 rounded-full font-medium border {STATUS_CLASSES[p.status] ?? 'bg-gray-100 text-gray-800'}">
                    {STATUS_LABEL[p.status] ?? p.status}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
