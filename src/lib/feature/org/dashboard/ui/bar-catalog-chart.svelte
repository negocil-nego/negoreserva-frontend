<script lang="ts">
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";
  import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { cubicInOut } from "svelte/easing";
  import type { DashboardCatalogWithProductCount } from "../data/service/dashboard.service";

  let { items = [] } = $props<{ items: DashboardCatalogWithProductCount[] }>();

  const chartConfig = {
    productCount: { label: "Produtos", color: "var(--chart-1)" },
  } satisfies Chart.ChartConfig;

  const chartData = $derived(
    items.map((item: any, index: any) => {
      const chartNumber = (index % 20) + 1;
      return {
        name: item.name,
        productCount: item.productCount,
        color: `var(--chart-${chartNumber})`,
      };
    }),
  );

  let totalProducts = $derived(
    items.reduce((sum: any, item: any) => sum + item.productCount, 0),
  );
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Produtos por Catálogo</Card.Title>
    <Card.Description
      >Quantidade de produtos cadastrados em cada catálogo</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <Chart.Container config={chartConfig} class="h-[170px] w-full">
      <BarChart
        labels={{ offset: 12 }}
        data={chartData}
        xScale={scaleBand().padding(0.25)}
        x="name"
        series={[
          {
            key: "productCount",
            label: "Produtos",
            color: chartConfig.productCount.color,
          },
        ]}
        axis="x"
        rule={false}
        props={{
          bars: {
            stroke: "none",
            radius: 8,
            rounded: "all",
            motion: { type: "tween", duration: 500, easing: cubicInOut },
          },
          highlight: { area: { fill: "none" } },
          xAxis: { format: (d) => d.slice(0, 10) },
        }}
      >
        {#snippet tooltip()}
          <Chart.Tooltip hideLabel />
        {/snippet}
      </BarChart>
    </Chart.Container>
  </Card.Content>
  <Card.Footer>
    <div class="flex w-full items-start gap-2 text-sm">
      <div class="grid gap-2">
        <div class="flex items-center gap-2 leading-none font-medium">
          Total de {totalProducts} produtos <TrendingUpIcon class="size-4" />
        </div>
        <div class="text-muted-foreground flex items-center gap-2 leading-none">
          Mostrando quantidade de produtos por catálogo ativo
        </div>
      </div>
    </div>
  </Card.Footer>
</Card.Root>
