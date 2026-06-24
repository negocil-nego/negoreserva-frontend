<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { BarChart } from "layerchart";
  import { scaleBand } from "d3-scale";
  import { cubicInOut } from "svelte/easing";

  type Props = {
    product?: number;
    catalog?: number;
    payment?: number;
  };

  let { product = 0, catalog = 0, payment = 0 }: Props = $props();

  const chartConfig = {
    product: { label: "Produtos", color: "var(--chart-1)" },
    catalog: { label: "Catálogo", color: "var(--chart-2)" },
    payment: { label: "Pagamentos", color: "var(--chart-3)" },
  } satisfies Chart.ChartConfig;

  const chartData = $derived(
    (
      Object.entries({ product, catalog, payment }) as [
        keyof typeof chartConfig,
        number,
      ][]
    ).map(([key, value]) => ({
      key,
      label: chartConfig[key].label,
      items: value,
      color: chartConfig[key].color,
    })),
  );
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Gráfico de barra</Card.Title>
    <Card.Description
      >De produtos, catálogos e pagamentos realizados</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <Chart.Container config={chartConfig} class="h-[140px] w-full">
      <BarChart
        data={chartData}
        orientation="horizontal"
        yScale={scaleBand().padding(0.25)}
        y="label"
        x="items"
        axis="y"
        rule={false}
        series={[{ key: "items", label: "Total" }]}
        cRange={chartData.map((d) => d.color)}
        padding={{ right: 16 }}
        props={{
          bars: {
            stroke: "none",
            radius: 5,
            rounded: "all",
            motion: { type: "tween", duration: 500, easing: cubicInOut },
          },
          highlight: { area: { fill: "none" } },
          yAxis: {
            tickLabelProps: {
              textAnchor: "start",
              dx: 6,
              class: "stroke-none fill-background!",
            },
            tickLength: 0,
          },
        }}
      />
    </Chart.Container>
  </Card.Content>
  <Card.Footer>
    <div class="text-muted-foreground text-sm leading-none">
      Total de cadastrados
    </div>
  </Card.Footer>
</Card.Root>
