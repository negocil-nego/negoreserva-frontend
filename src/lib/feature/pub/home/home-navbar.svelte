<script lang="ts">
  import Logo from "$lib/components/logo.svelte";
  import MenuLinks from "$lib/components/navs/menu-links.svelte";
</script>

<nav class="flex items-center justify-between container">
  <div>
    <Logo />
  </div>
  <div class="flex items-center gap-2">
    <MenuLinks />
  </div>
</nav>
