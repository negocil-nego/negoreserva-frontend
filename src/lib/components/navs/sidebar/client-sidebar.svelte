<script lang="ts" module>
  import { userAuthStore } from "$lib/stores/user-auth.store";
</script>

<script lang="ts">
  import {
    DashboardSquare01Icon,
    MoneyBag01Icon,
    User02Icon
  } from "@hugeicons/core-free-icons";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import type { ComponentProps } from "svelte";
  import NavMenus from "../nav-menus.svelte";
  import NavUser from "../nav-user.svelte";

  let {
    ref = $bindable(null),
    collapsible = "icon",
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> = $props();

  const user = $derived(userAuthStore.getUserAuthResponse());

  const data = $derived({
    user,
    menus: [
      {
        name: "Dashboard",
        url: "/dashboard/client",
        icon: DashboardSquare01Icon,
      },
      {
        name: "Perfil",
        url: "/dashboard/client/profile",
        icon: User02Icon,
      },
      {
        name: "Pagamentos",
        url: "/dashboard/client/payments",
        icon: MoneyBag01Icon,
      },
    ],
  });
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header>
    <NavUser user={data.user} />
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMenus items={data.menus} />
  </Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>
