<script lang="ts">
  import { PieChart } from "layerchart";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";

  type DataItem = {
    key: string;
    label: string;
    value: number;
    color: string;
  };

  let {
    data = [],
    title = "",
    description = "",
    footerLabel = "",
  }: {
    data: DataItem[];
    title?: string;
    description?: string;
    footerLabel?: string;
  } = $props();

  const chartConfig = $derived.by(() => {
    const config: Record<string, { label: string; color: string }> = {};
    for (const d of data) {
      config[d.key] = { label: d.label, color: d.color };
    }
    return config;
  }) satisfies Chart.ChartConfig;

  let total = $derived(data.reduce((s, d) => s + d.value, 0));
</script>

<Card.Root class="flex flex-col">
  <Card.Header class="items-center">
    <Card.Title>{title}</Card.Title>
    {#if description}
      <Card.Description>{description}</Card.Description>
    {/if}
  </Card.Header>
  <Card.Content class="flex-1">
    <Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[200px]">
      <PieChart
        data={data}
        key="key"
        value="value"
        cRange={data.map((d) => d.color)}
        c="color"
        props={{ pie: { motion: "tween" } }}
        legend
      >
        {#snippet tooltip()}
          <Chart.Tooltip hideLabel />
        {/snippet}
      </PieChart>
    </Chart.Container>
  </Card.Content>
  <Card.Footer class="flex-col gap-2 text-sm">
    <div class="flex items-center gap-2 leading-none font-medium">
      Total de {total}
    </div>
    {#if footerLabel}
      <div class="text-muted-foreground leading-none">{footerLabel}</div>
    {/if}
  </Card.Footer>
</Card.Root>
