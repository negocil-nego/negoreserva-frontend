<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import type {
    GetOrganizationProductResponse,
    GetOrganizationResponse,
  } from "$lib/feature/pub/organization";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";

  import GetOrganizationProductTagInfoCarousel from "./get-organization-product-tag-info-carousel.svelte";
  import GetOrganizationCategoryCarousel from "./get-organization-category-carousel.svelte";
  import FavouriteProductFileButton from "./buttons/favourite-product-file-button.svelte";
  import SharedProductFileButton from "./buttons/shared-product-file-button.svelte";
  import ProductDetailCard from "../../product/ui/product-detail-card.svelte";
  import HeaderCardOrganization from "./header-card-organization.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  let { item } = $props<{ item: GetOrganizationResponse }>();

  let selected = $state<GetOrganizationProductResponse | null>(null);
  let numbers = $state<number[]>([]);

  let api = $state<CarouselAPI>();

  $effect(() => {
    selected = item?.products?.at(0) ?? null;
    numbers = Array.from({ length: item.products.length }, (_, i) => i + 1);
    if (api) {
      api.on("select", () => {
        //alert("change1");
      });
    }
  });
</script>

<aside
  class="rounded-md bg-white border border-gray-50 dark:border-gray-800 dark:bg-slate-950/30 relative"
>
  <div
    class="my-2 px-1 flex flex-col-reverse md:flex-row justify-between z-5 w-full"
  >
    <HeaderCardOrganization item={item} />
  </div>
  <div class="relative">
    <button
      onclick={() => {
        goto(resolve(`/organization/${item.organization.slug}`));
      }}
      class="w-full"
    >
      <img
        src={item.organization.image}
        alt={item.organization.name}
        class="w-full h-50 object-fill group-hover:scale-105 transition-transform duration-500 cursor-pointer img-responsive"
      />
    </button>
    <div class="absolute bottom-4 left-1  px-1">
      <GetOrganizationCategoryCarousel categories={item.categories} />
    </div>
  </div>

  <div class="w-full px-1">
    <Carousel.Root>
      <Carousel.Content class="flex gap-2">
        {#each numbers as i (i)}
          <Carousel.Item class="basis-auto" onclick={() => { selected = item.products[i - 1]; }}>
            <ProductDetailCard
                    data={item.products[i - 1]}
                    selected={selected?.product.uuid === item.products[i - 1].product.uuid}
                    onclick={() => {
                      //goto(resolve(`/product/${item.products[i - 1].product.slug}`))
                    }}
            />
          </Carousel.Item>
        {/each}
      </Carousel.Content>
    </Carousel.Root>
  </div>
  <div class="p-1">
    <div class="text-sm text-gray-500">
      {#if selected}
        <div
          class="bg-gray-50 rounded-md p-2 dark:bg-slate-950/30 dark:text-white"
        >
          <div
            class="border-b border-gray-100 dark:border-gray-700 my-1 pb-2 flex flex-col-reverse md:flex-row md:justify-between md:items-center"
          >
            <div class="">
              <div class="font-semibold text-md">
                {selected.product.name}
              </div>
            </div>
            <div class="flex gap-2 justify-end md:justify-center">
              <SharedProductFileButton />
              <FavouriteProductFileButton />
            </div>
          </div>

          <GetOrganizationProductTagInfoCarousel tags={selected.tags} />

          <div class="flex flex-col md:flex-row gap-2">
            <div class="my-2 space-y-1 md:flex-1  relative">
              <div class="text-[12px]">Descrição</div>
              <div class="max-h-5">
                {selected.product.description?.substring(0, 90)} ...
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center w-full gap-1 py-2">
          <Button
            onclick={() => {
              if(selected) goto(resolve(`/product/${selected.product.slug}`))
            }}
            class="p-2 flex-1 rounded-md border-green-700 bg-white dark:bg-background text-green-700 dark:text-white"
            variant="outline"
          >
            Solicitar
          </Button>
        </div>
      {:else}
        <div>Seleciona um produto para agendar</div>
      {/if}
    </div>
  </div>
</aside>

<style>
  @media (min-height: 1080px) {
    .img-responsive {
      height: 200px !important;
    }
  }
</style>
