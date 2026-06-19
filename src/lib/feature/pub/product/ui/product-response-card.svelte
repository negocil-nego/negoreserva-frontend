<script lang="ts">
  import RatingGenerator from "$lib/components/rating-generator.svelte";
  import type { ProductResponse } from "$lib/feature/pub/product";
  import ProductPreview from "./product-preview.svelte";
  import {goto} from "$app/navigation";

  type Props = { product: ProductResponse };

  let { product }: Props = $props();
</script>

<div class="relative aspect-4/3 overflow-hidden bg-muted">
  <div
    class="absolute inset-0 bg-linear-to-b from-black/80 to-transparent rounded-md min-h-10"
  ></div>
  {#if product.image}
    <img
      src={product.image}
      alt={product.name}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-md"
    />
  {:else}
    <div class="w-full h-full flex items-center justify-center">
      <span class="text-5xl font-bold text-muted-foreground/30"
        >{product.name.charAt(0)}</span
      >
    </div>
  {/if}

  <button class="absolute inset-x-0 top-0 flex items-center gap-1.5 p-1 z-50 cursor-pointer"
       onclick={() => goto(`/detail/organization/${product.organization.slug}`)}
  >
    {#if product.organization.logo}
      <img
        src={product.organization.logo}
        alt={product.organization.name}
        class="size-5 rounded object-cover bg-muted"
      />
    {:else}
      <span
        class="size-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-green-700 shrink-0"
      >
        {product.organization.name.charAt(0)}
      </span>
    {/if}
    <div class="flex-col gap-0">
      <span
        class="text-white text-[11px] uppercase tracking-wide truncate font-medium"
      >
        {product.organization.name}
      </span>
      {#if product.organization.rating}
        <RatingGenerator rating={product.organization.rating} />
      {/if}
    </div>
  </button>

  <div
    class="absolute inset-x-0 bottom-0 p-3 gap-2 bg-linear-to-t from-black/10 via-black/10 to-transparent pt-8 rounded-b-md flex flex-col justify-end"
  >
    <div
      class="font-semibold text-base text-white truncate"
      title={product.name}
    >
      {product.name}
    </div>
    <div class="w-full flex items-center justify-between">
      <ProductPreview slug={product.slug} />

      <span
        class="text-xl font-bold text-emerald-400 bg-black/50 px-2 py-0.5 rounded-sm shrink-0"
      >
        {new Intl.NumberFormat("pt-AO", {
          style: "currency",
          currency: "AOA",
        }).format(product.price ?? 0)}
      </span>
    </div>
  </div>
</div>
