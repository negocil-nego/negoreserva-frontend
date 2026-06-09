<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ProductLoadingIcon } from "@hugeicons/core-free-icons";
    import OrganizationProductProfile from "../organization-product-profile.svelte";
  import type {OrganizationDetailResponse} from "$lib/feature/pub/organization";

  let { data }: { data: OrganizationDetailResponse } = $props();
</script>

<section id="organization-section-products" class="mt-10 bg-panel p-6 border">
  <div class="flex items-center gap-2 mb-6">
    <HugeiconsIcon icon={ProductLoadingIcon} size={24} color="currentColor" strokeWidth={1} />
    <h2 class="text-xl font-bold">Produtos Disponíveis</h2>
  </div>

  {#if data.products && data.products.length > 0}
    <Carousel.Root class="w-full relative md:px-10">
      <Carousel.Content class="w-full">
        {#each data.products as product (product.uuid)}
          <Carousel.Item class="basis-auto">
            <OrganizationProductProfile data={product} />
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <Carousel.Previous class="ml-0 inset-s-0"/>
      <Carousel.Next class="mr-0 inset-e-0"/>
    </Carousel.Root>
  {:else}
    <p class="text-sm text-muted-foreground">Nenhum produto disponível.</p>
  {/if}
</section>
