<script lang="ts">
  import type { OrganizationDetailResponse } from "../../data/model/organization.model";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import ProductDetailCard from "$lib/feature/pub/product/ui/product-detail-card.svelte";
  let { data }: { data: OrganizationDetailResponse } = $props();
</script>

<section
  id="organization-products"
  class="mx-5 mt-10 bg-gray-50 dark:bg-transparent rounded-2xl"
>
  <div class="p-4 text-xl">Produtos disponiveis</div>
  <Carousel.Root class="w-full relative">
    <Carousel.Content
      class="w-full px-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
    >
      {#each data.products as product (product.uuid)}
        <Carousel.Item>
          <ProductDetailCard data={product} />
        </Carousel.Item>
      {/each}
    </Carousel.Content>
  </Carousel.Root>
</section>
