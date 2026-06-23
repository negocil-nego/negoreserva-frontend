<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ShoppingCart01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
  import { shopStore, shopCount } from "$lib/stores/shop.store";

  let count = $derived($shopCount);
</script>

<Drawer.Root direction="right">
  <Drawer.Trigger class="relative flex cursor-pointer items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors">
    <HugeiconsIcon icon={ShoppingCart01Icon} size={22} color="currentColor" strokeWidth={1.5} />
    {#if count > 0}
      <span class="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-pink-400 text-[10px] font-bold text-white">
        {count}
      </span>
    {/if}
  </Drawer.Trigger>

  <Drawer.Content class="flex flex-col">
    <Drawer.Header>
      <Drawer.Title class="text-lg font-bold">Carrinho de Compras</Drawer.Title>
      <Drawer.Description class="text-xs text-muted-foreground">
        {count} {count === 1 ? "item" : "itens"} no carrinho
      </Drawer.Description>
    </Drawer.Header>

    <div class="flex-1 overflow-y-auto px-4">
      {#if count === 0}
        <p class="py-8 text-center text-sm text-muted-foreground">Carrinho vazio</p>
      {:else}
        {#each $shopStore as item (item.productUuid)}
          <div class="flex items-center justify-between border-b py-3">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate">{item.productName}</p>
              <p class="text-xs text-muted-foreground truncate">{item.organizationName}</p>
              <p class="text-sm font-bold text-green-700 mt-1">
                {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(item.price)}
                <span class="text-xs font-medium text-foreground"> x {item.quantity}</span>
              </p>
            </div>
            <button
              class="ml-2 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              onclick={() => shopStore.removeItem(item.productUuid)}
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} color="currentColor" strokeWidth={1} />
            </button>
          </div>
        {/each}
      {/if}
    </div>

    {#if count > 0}
      <div class="border-t p-4">
        <button
          class="w-full rounded-md bg-green-700 py-2 text-sm font-bold text-white hover:bg-green-800 transition-colors cursor-pointer"
          onclick={() => shopStore.clear()}
        >
          Limpar Carrinho
        </button>
      </div>
    {/if}
  </Drawer.Content>
</Drawer.Root>