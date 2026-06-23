<script lang="ts">
    import EmptyNotFound from "$lib/components/empty-not-found.svelte";
  import type { OrganizationDetailResponse } from "$lib/feature/pub/organization";
  import ProductResponseDetailCard from "$lib/feature/pub/product/ui/product-response-detail-card.svelte";

  let { data }: { data: OrganizationDetailResponse; url?: string } = $props();

  const products = $derived(data.products ?? []);
</script>

<section id="organization-section-products" class="bg-panel p-6 border relative w-full">
  {#if products.length > 0}
    <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-3" role="region" aria-label="Products">
      {#each products as product (product.uuid)}
        <ProductResponseDetailCard detail={product} />
      {/each}
    </div>
  {:else}
    <EmptyNotFound />
  {/if}
</section>