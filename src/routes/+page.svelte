<script lang="ts">
    import HomeOrganizationPaginate from "$lib/feature/pub/organization/ui/home-organization-paginate.svelte";
    import HomeCategories from "$lib/feature/pub/home/home-categories.svelte";
    import HomeFooter from "$lib/feature/pub/home/home-footer.svelte";
    import HomeNavbar from "$lib/feature/pub/home/home-navbar.svelte";
    import HomeSearch from "$lib/feature/pub/home/home-search.svelte";
</script>

<header class="bg-brand container relative">
    <HomeNavbar/>
    <HomeCategories/>
    <HomeSearch/>
</header>

<div class="flex flex-col justify-start container relative ">
    <HomeOrganizationPaginate/>
</div>

<div class="container">
    <HomeFooter/>
</div>

<style>
    :global(body) {
        overflow-x: hidden;
    }
</style>
