<script lang="ts">
  import HomeOrganizationPaginate from "$lib/feature/pub/organization/ui/home-organization-paginate.svelte";
  import CategoryCarouselBadge from "$lib/feature/pub/category/ui/category-carousel-badge.svelte";
  import HomeHeroSection from "$lib/feature/pub/home/home-hero-section.svelte";
  import HomeServices from "$lib/feature/pub/home/home-services.svelte";
  import HomeFooter from "$lib/feature/pub/home/home-footer.svelte";
  import HomeNavbar from "$lib/feature/pub/home/home-navbar.svelte";
</script>

<section
  class="fixed items-center top-0 w-full z-30 h-22.5 px-3 bg-white dark:bg-background border-b"
>
  <HomeNavbar />
</section>

<section
  class="flex sticky top-22.5 z-20 justify-start items-center pt-3 px-3 bg-white dark:bg-background border-b w-full"
>
  <CategoryCarouselBadge isRedirect/>
</section>

<section class="px-5 md:px-10 py-5 mt-25 md:mt-[50px]">
  <HomeHeroSection />
</section>

<div class="flex flex-col justify-start px-5 md:px-10 relative bg-white dark:bg-background py-5">
  <HomeOrganizationPaginate />
</div>

<div class="flex md:flex-row flex-col px-5 md:px-10 relative py-10 md:py-40 items-start overflow-none">
  <HomeServices/>
</div>

<div class="bg-white dark:bg-transparent">
  <HomeFooter />
</div>

<style>
  :global(body) {
    overflow-x: hidden;
  }
</style>
