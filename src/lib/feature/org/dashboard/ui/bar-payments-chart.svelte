<script lang="ts">
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";
  import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { cubicInOut } from "svelte/easing";
  import { DashboardService, type DashboardPaymentMonthly } from "../data/service/dashboard.service";

  let { year: currentYear }: { year?: number } = $props();

  const service = new DashboardService();

  let mode = $state<"QUANTIDADE" | "TOTAL">("QUANTIDADE");
  let data = $state<DashboardPaymentMonthly | null>(null);
  let loading = $state(true);

  const MONTHS = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const MONTH_KEYS = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
  ] as const;

  let year = $derived(currentYear ?? new Date().getFullYear());

  $effect(() => {
    loading = true;
    service.getPaymentsMonthly(year, mode)
      .then((d) => { data = d; })
      .catch(console.error)
      .finally(() => { loading = false; });
  });

  const chartConfig = {
    value: { label: "Valor", color: "var(--chart-2)" },
  } satisfies Chart.ChartConfig;

  let chartData = $derived(
    MONTH_KEYS.map((key, i) => ({
      month: MONTHS[i],
      value: data?.[key] ?? 0,
    })),
  );

  let total = $derived(chartData.reduce((s, d) => s + d.value, 0));
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Pagamentos por Mês</Card.Title>
    <Card.Description>Total de pagamentos realizados no ano {year}</Card.Description>
    <Tabs.Tabs value={mode} onValueChange={(v) => mode = v as "QUANTIDADE" | "TOTAL"}>
      <Tabs.TabsList>
        <Tabs.TabsTrigger value="QUANTIDADE">Quantidade</Tabs.TabsTrigger>
        <Tabs.TabsTrigger value="TOTAL">Total</Tabs.TabsTrigger>
      </Tabs.TabsList>
    </Tabs.Tabs>
  </Card.Header>
  <Card.Content>
    {#if loading}
      <div class="h-[170px] w-full flex items-center justify-center text-muted-foreground text-sm">
        A carregar...
      </div>
    {:else}
      <Chart.Container config={chartConfig} class="h-[170px] w-full">
        <BarChart
          labels={{ offset: 12 }}
          data={chartData}
          xScale={scaleBand().padding(0.2)}
          x="month"
          series={[
            {
              key: "value",
              label: mode === "QUANTIDADE" ? "Quantidade" : "Total",
              color: chartConfig.value.color,
            },
          ]}
          axis="x"
          rule={false}
          props={{
            bars: {
              stroke: "none",
              radius: 6,
              rounded: "all",
              motion: { type: "tween", duration: 500, easing: cubicInOut },
            },
            highlight: { area: { fill: "none" } },
            xAxis: { format: (d) => d.slice(0, 3) },
          }}
        >
          {#snippet tooltip()}
            <Chart.Tooltip hideLabel />
          {/snippet}
        </BarChart>
      </Chart.Container>
    {/if}
  </Card.Content>
  <Card.Footer>
    <div class="flex w-full items-start gap-2 text-sm">
      <div class="grid gap-2">
        <div class="flex items-center gap-2 leading-none font-medium">
          Total {mode === "QUANTIDADE" ? `${total} pagamentos` : `${total.toLocaleString()} Kz`}
          <TrendingUpIcon class="size-4" />
        </div>
        <div class="text-muted-foreground flex items-center gap-2 leading-none">
          {mode === "QUANTIDADE" ? "Quantidade de pagamentos por mês" : "Valor total dos pagamentos por mês"}
        </div>
      </div>
    </div>
  </Card.Footer>
</Card.Root>
