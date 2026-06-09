<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { ProductPriceType } from "$lib/feature/org/product/data/enums/product-price-type";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { PlusSignIcon, Delete02Icon, StarIcon } from "@hugeicons/core-free-icons";

  interface PriceItem {
    type: string;
    value: number;
    order: number;
    unit: number;
    isPrimary: boolean;
  }

  let {
    prices = $bindable([]),
    readOnly = false,
  }: {
    prices: PriceItem[];
    readOnly?: boolean;
  } = $props();

  // State for new price input form
  let newType = $state(ProductPriceType.BASE);
  let newValue = $state<number | null>(null);
  let newOrder = $state<number>(1);
  let newUnit = $state<number>(1);
  let newIsPrimary = $state<boolean>(false);

  function handleAddPrice() {
    if (newValue === null || newValue < 0) return;
    
    // Create new price
    const newPrice: PriceItem = {
      type: newType,
      value: newValue,
      order: newOrder,
      unit: newUnit,
      isPrimary: prices.length === 0 ? true : newIsPrimary,
    };

    // If this price is primary, unmark other prices as primary
    if (newPrice.isPrimary) {
      prices = prices.map(p => ({ ...p, isPrimary: false }));
    }

    prices = [...prices, newPrice].sort((a, b) => a.order - b.order);

    // Reset form inputs
    newValue = null;
    newOrder = prices.length + 1;
    newUnit = 1;
    newIsPrimary = false;
  }

  function handleRemovePrice(index: number) {
    const removed = prices[index];
    prices = prices.filter((_, i) => i !== index);
    
    // If we removed the primary one and there are other prices left, make the first one primary
    if (removed.isPrimary && prices.length > 0) {
      prices[0].isPrimary = true;
      prices = [...prices];
    }
  }

  function togglePrimary(index: number) {
    if (readOnly) return;
    prices = prices.map((p, i) => ({
      ...p,
      isPrimary: i === index,
    }));
  }

  function getBadgeColor(type: string) {
    switch (type) {
      case ProductPriceType.BASE:
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      case ProductPriceType.HOUR:
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
      case ProductPriceType.DAY:
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800";
      case ProductPriceType.NIGHT:
        return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/30 dark:text-slate-300 dark:border-slate-800";
    }
  }
</script>

<div id="product-price-section" class="bg-white dark:bg-transparent rounded-2xl p-6 space-y-6 scroll-mt-20">
  <div class="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">Lista de Preços</h3>
    <p class="text-sm text-slate-500 dark:text-slate-400">Gerencie a estrutura de preços do produto (base, hora, dia ou noite).</p>
  </div>

  {#if !readOnly}
    <!-- Add price form -->
    <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850 space-y-4">
      <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Adicionar Novo Preço</div>
      
      <div class="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
        <div class="space-y-1.5 col-span-2 md:col-span-1">
          <Label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Tipo</Label>
          <select
            bind:value={newType}
            class="flex h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-700 dark:text-slate-350"
          >
            <option value={ProductPriceType.BASE}>Base</option>
            <option value={ProductPriceType.HOUR}>Por Hora</option>
            <option value={ProductPriceType.DAY}>Por Dia</option>
            <option value={ProductPriceType.NIGHT}>Por Noite</option>
          </select>
        </div>

        <div class="space-y-1.5 col-span-1">
          <Label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Valor (MT)</Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            bind:value={newValue}
            class="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          />
        </div>

        <div class="space-y-1.5 col-span-1">
          <Label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Unidade (min. 1)</Label>
          <Input
            type="number"
            min="1"
            step="1"
            bind:value={newUnit}
            class="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          />
        </div>

        <div class="space-y-1.5 col-span-1">
          <Label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Ordem</Label>
          <Input
            type="number"
            min="1"
            step="1"
            bind:value={newOrder}
            class="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          />
        </div>

        <div class="col-span-2 md:col-span-1 flex gap-2">
          <Button
            type="button"
            onclick={handleAddPrice}
            disabled={newValue === null || newValue < 0}
            class="w-full h-10 rounded-xl bg-brand hover:bg-brand/90 text-white font-medium flex items-center justify-center gap-1 cursor-pointer"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            <span>Adicionar</span>
          </Button>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <input type="checkbox" id="isPrimaryCheck" bind:checked={newIsPrimary} class="rounded text-brand focus:ring-brand cursor-pointer" />
        <label for="isPrimaryCheck" class="text-xs text-slate-500 dark:text-slate-400 cursor-pointer">Definir este como preço principal do produto</label>
      </div>
    </div>
  {/if}

  <!-- Price list display -->
  <div class="space-y-3">
    <div class="text-sm font-bold text-slate-700 dark:text-slate-350">Preços Registados ({prices.length})</div>
    
    {#if prices.length === 0}
      <div class="text-center py-8 text-sm text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-850 rounded-2xl">
        Nenhum preço adicionado ainda. Adicione pelo menos um preço para o produto.
      </div>
    {:else}
      <div class="overflow-hidden border border-slate-100 dark:border-slate-800 rounded-xl">
        <table class="w-full text-left border-collapse text-sm">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 font-semibold">
              <th class="p-3">Tipo</th>
              <th class="p-3 text-right">Valor</th>
              <th class="p-3 text-center">Unidade</th>
              <th class="p-3 text-center">Ordem</th>
              <th class="p-3 text-center">Principal</th>
              {#if !readOnly}
                <th class="p-3 text-center">Ações</th>
              {/if}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            {#each prices as item, index (index)}
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 text-slate-750 dark:text-slate-300 transition-colors">
                <td class="p-3">
                  <span class="px-2 py-0.5 text-xs font-semibold rounded-full border {getBadgeColor(item.type)}">
                    {item.type}
                  </span>
                </td>
                <td class="p-3 text-right font-semibold text-slate-800 dark:text-slate-100">
                  {item.value.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                </td>
                <td class="p-3 text-center">{item.unit}</td>
                <td class="p-3 text-center">{item.order}</td>
                <td class="p-3 text-center">
                  <button
                    type="button"
                    onclick={() => togglePrimary(index)}
                    disabled={readOnly}
                    class="focus:outline-none cursor-pointer text-amber-500 hover:scale-115 transition-transform"
                    title={item.isPrimary ? "Preço Principal" : "Clique para tornar principal"}
                  >
                    {#if item.isPrimary}
                      <HugeiconsIcon icon={StarIcon} size={18} class="text-amber-500 fill-amber-500" />
                    {:else}
                      <HugeiconsIcon icon={StarIcon} size={18} class="text-slate-300 dark:text-slate-700 hover:text-amber-300" />
                    {/if}
                  </button>
                </td>
                {#if !readOnly}
                  <td class="p-3 text-center">
                    <button
                      type="button"
                      onclick={() => handleRemovePrice(index)}
                      class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={16} />
                    </button>
                  </td>
                {/if}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>
