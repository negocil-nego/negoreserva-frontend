<script lang="ts">
  import type {
    GetOrganizationResponse,
  } from "$lib/feature/pub/organization";
  import GetOrganizationCategoryCarousel from "./get-organization-category-carousel.svelte";
  import HeaderCardOrganization from "./header-card-organization.svelte";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  let { item } = $props<{ item: GetOrganizationResponse }>();
</script>

<aside
  class="rounded-md border border-gray-50 dark:border-gray-800 dark:bg-slate-950/30 relative"
>
  <div
    class="absolute p-2 flex flex-col-reverse md:flex-row justify-between z-5 w-full"
  >
    <div class="absolute inset-0 bg-linear-to-b from-black/70 to-transparent rounded-md min-h-40"></div>
    <HeaderCardOrganization {item} />
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
        class="w-full h-50 lg:min-h-56 xl:min-h-72 object-fill group-hover:scale-105 transition-transform duration-500 cursor-pointer img-responsive rounded-md"
      />
    </button>
    <div class="absolute bottom-4 left-1  px-1">
      <GetOrganizationCategoryCarousel categories={item.categories} />
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
