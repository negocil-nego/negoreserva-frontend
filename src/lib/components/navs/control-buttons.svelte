<script lang="ts">
  import NavUser from "$lib/components/navs/nav-user.svelte";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import {
    userAuthStore,
    isAuthenticatedStore,
  } from "$lib/stores/user-auth.store";
  import RegisterOptionsDrawer from "../../feature/pub/auth/register/ui/register-options-drawer.svelte";
  import NotificationDrawer from "../drawer/notification-drawer.svelte";
  import ShopCartBadge from "../shop-cart-badge.svelte";
  import LoginNavigationButton from "./login-navigation-button.svelte";
  import MenuDrawer from "./menu-drawer.svelte";

  const isAuthenticated = $derived($isAuthenticatedStore);
  const user = $derived($userAuthStore);
</script>

<div class="flex">
  <div class="flex md:hidden">
    <MenuDrawer />
  </div>
  <div class="items-center gap-1 hidden md:flex md:gap-2">
    <ShopCartBadge />
    <DropdownTheme />
    <NotificationDrawer />
    {#if !isAuthenticated}
      <LoginNavigationButton isLabel />
      <RegisterOptionsDrawer isLabel />
    {:else}
      <NavUser {user} isShort={true} />
    {/if}
  </div>
</div>
