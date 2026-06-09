<script lang="ts">
  import NavUser from "$lib/components/navs/nav-user.svelte";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import { userAuthStore } from "$lib/stores/user-auth.store";
  import RegisterOptionsDrawer from "../../feature/pub/auth/register/ui/register-options-drawer.svelte";
  import LoginNavigationButton from "./login-navigation-button.svelte";
  import MenuDrawer from "./menu-drawer.svelte";

  let isAuthenticated = $derived(userAuthStore.isAuthenticated());
  const user = $derived(userAuthStore.getUserAuthResponse());
</script>

<div class="flex gap-2">
  <div class="flex md:hidden">
    <MenuDrawer />
  </div>
  <div class="items-center gap-1 hidden md:flex">
    <DropdownTheme />
    {#if !isAuthenticated}
      <LoginNavigationButton isLabel/>
      <RegisterOptionsDrawer isLabel/>
    {:else}
      <NavUser {user} isShort={true}/>
    {/if}
  </div>
</div>
