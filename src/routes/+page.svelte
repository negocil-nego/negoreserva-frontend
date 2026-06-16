<script lang="ts">
    import HomeOrganizationFilter from "$lib/feature/pub/home/home-organization-filter.svelte";
    import HomeOrganizationHighlight from "$lib/feature/pub/home/home-organization-highlight.svelte";
    import HomeOrganizationPaginate from "$lib/feature/pub/home/home-organization-paginate.svelte";
    import HomeCarouselInfo from "$lib/feature/pub/home/home-carousel-info.svelte";
    import HomeCategories from "$lib/feature/pub/home/home-categories.svelte";
    import HomeFooter from "$lib/feature/pub/home/home-footer.svelte";
    import HomeNavbar from "$lib/feature/pub/home/home-navbar.svelte";
    import HomeSearch from "$lib/feature/pub/home/home-search.svelte";
    import { searchFilterStore } from "$lib/stores/search-filter.store";

    let isSearching = $state($searchFilterStore.isSearching);

    $effect(() => {
        isSearching = $searchFilterStore.isSearching;
    });
</script>

<header class="bg-brand relative">
    <HomeNavbar />
    <HomeCategories />
    <HomeSearch />
</header>

<div class="w-full mt-13">
    {#if isSearching}
        <HomeOrganizationFilter />
    {:else}
        <HomeCarouselInfo />
        <HomeOrganizationHighlight />
    {/if}
</div>

<div class="w-full mt-5">
    <HomeOrganizationPaginate />
</div>

<HomeFooter />

<style>
    :global(body) {
        overflow-x: hidden;
    }
</style>
