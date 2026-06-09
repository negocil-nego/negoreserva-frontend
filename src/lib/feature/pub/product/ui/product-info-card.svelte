<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { ProductDetailResponse } from "../data/model/product.model";

  let { data }: { data: ProductDetailResponse } = $props();

  let primaryPrice = $derived(
    data.prices?.find((p) => p.isPrimary) ?? data.prices?.[0]
  );
  let priceText = $derived(
    primaryPrice ? `${primaryPrice.value.toLocaleString('pt-MZ')} kz` : "Sob Consulta"
  );
</script>

<aside>
  <header class="mb-5">
    <h1 class="text-xl font-bold mb-2">{data.name}</h1>
    <div class="text-2xl text-primary">{priceText}</div>
  </header>
  <Accordion.Root type="single" class="w-full border-none" value="item-1">
    <Accordion.Item
      value="item-1"
      class="hover:bg-transparent focus:bg-transparent"
    >
      <Accordion.Trigger>Descrição</Accordion.Trigger>
      <Accordion.Content class="flex flex-col gap-4 text-balance">
        <p>{data.description}</p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item
      value="item-2"
      class="hover:bg-transparent focus:bg-transparent"
    >
      <Accordion.Trigger>Informações</Accordion.Trigger>
      <Accordion.Content class="flex flex-col gap-4 text-balance">
        {#each data.tags as { uuid, title, value } (uuid)}
          <div class="flex items-center justify-between gap-2">
            <div class="font-medium italic">{title}</div>
            <div>{value}</div>
          </div>
        {/each}
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
  <footer class="mt-10">
    <Button class="w-full bg-brand">Solicitar</Button>
  </footer>
</aside>
