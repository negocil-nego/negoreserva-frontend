<script lang="ts">
    import HomeOrganizationPaginate from "$lib/feature/pub/organization/ui/home-organization-paginate.svelte";
    import HomeCategories from "$lib/feature/pub/home/home-categories.svelte";
    import HomeFooter from "$lib/feature/pub/home/home-footer.svelte";
    import HomeNavbar from "$lib/feature/pub/home/home-navbar.svelte";
    import HomeSearch from "$lib/feature/pub/home/home-search.svelte";
</script>

<header class="bg-brand px-5 md:px-16 relative">
    <HomeNavbar/>
    <HomeCategories/>
    <HomeSearch/>
</header>

<div class="flex flex-col justify-start px-5 md:px-10 relative bg-white dark:bg-background">
    <HomeOrganizationPaginate/>
</div>

<div class="bg-white dark:bg-transparent">
    <HomeFooter/>
</div>

<style>
    :global(body) {
        overflow-x: hidden;
    }
</style>
