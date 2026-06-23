<script lang="ts">
  import { Arc, PieChart, Text } from "layerchart";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";

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

<Card.Root class="flex flex-col">
  <Card.Header class="items-center">
    <Card.Title>Gráfica de pizza</Card.Title>
    <Card.Description>
      De produtos, catalogos, pagamentos realizados
    </Card.Description>
  </Card.Header>
  <Card.Content class="flex-1">
    <Chart.Container
      config={chartConfig}
      class="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart
        data={chartData}
        key="key"
        value="items"
        cRange={chartData.map((d) => d.color)}
        c="color"
        props={{ pie: { motion: "tween" } }}
      >
        {#snippet tooltip()}
          <Chart.Tooltip hideLabel />
        {/snippet}
        {#snippet arc({ props, visibleData, index })}
          <Arc {...props}>
            {#snippet children({ getArcTextProps })}
              <Text
                value={visibleData[index].label}
                {...getArcTextProps("centroid")}
                font-size="12"
                class="fill-background"
              />
            {/snippet}
          </Arc>
        {/snippet}
      </PieChart>
    </Chart.Container>
  </Card.Content>
  <Card.Footer class="flex-col gap-2 text-sm">
    <div class="text-muted-foreground leading-none">Total de cadastados</div>
  </Card.Footer>
</Card.Root>
