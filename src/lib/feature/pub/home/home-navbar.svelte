<script lang="ts">
  import HomeInputSearch from "./home-input-search.svelte";
  import Logo from "$lib/components/logo.svelte";
    import MenuLinks from "$lib/components/navs/menu-links.svelte";
</script>

<nav class="flex items-center justify-between h-full">
  <div>
    <Logo />
  </div>

  <div class="hidden md:block w-full md:w-10/12 lg:w-6/12">
    <HomeInputSearch />
  </div>

  <MenuLinks/>
</nav>
