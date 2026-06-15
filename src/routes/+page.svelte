<script lang="ts">
    import HomeOrganizationPaginate from "$lib/feature/pub/organization/ui/home-organization-paginate.svelte";
    import HomeCarouselInfo from "$lib/feature/pub/home/home-carousel-info.svelte";
    import HomeCategories from "$lib/feature/pub/home/home-categories.svelte";
    import HomeFooter from "$lib/feature/pub/home/home-footer.svelte";
    import HomeNavbar from "$lib/feature/pub/home/home-navbar.svelte";
    import HomeSearch from "$lib/feature/pub/home/home-search.svelte";
</script>

<header class="bg-brand relative">
    <HomeNavbar />
    <HomeCategories />
    <HomeSearch />
</header>

<div class="w-full mt-13">
    <HomeCarouselInfo />
</div>

<HomeOrganizationPaginate />
<HomeFooter />

<style>
    :global(body) {
        overflow-x: hidden;
    }
</style>
