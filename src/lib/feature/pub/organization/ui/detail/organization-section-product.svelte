<script lang="ts">
  import type { OrganizationDetailResponse } from "../../data/model/organization.model";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import ProductDetailCard from "$lib/feature/pub/product/ui/product-detail-card.svelte";
  let { data }: { data: OrganizationDetailResponse } = $props();

  const products = $derived(data.products.map((product) => ({
    product: {
      uuid: product.uuid,
      name: product.name,
      slug: product.uuid,
      price: null,
      description: product.description,
      image: product.image,
    },
    files: product.files,
    tags: product.tags,
    prices: product.prices,
  })));
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
      {#each products as product (product.product.uuid)}
        <Carousel.Item>
          <ProductDetailCard data={product} selected={false} />
        </Carousel.Item>
      {/each}
    </Carousel.Content>
  </Carousel.Root>
</section>
