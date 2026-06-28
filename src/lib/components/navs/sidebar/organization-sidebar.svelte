<script lang="ts" module>
  import { userAuthStore } from "$lib/stores/user-auth.store";
</script>

<script lang="ts">
  import {
    DashboardSquare01Icon,
    Layers01Icon,
    MoneyBag01Icon,
    User02Icon,
    ProductLoadingIcon,
    AddTeamIcon,
    Briefcase01Icon,
  } from "@hugeicons/core-free-icons";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import type { ComponentProps } from "svelte";
  import NavMenus from "../nav-menus.svelte";
  import NavUser from "../nav-user.svelte";
  import Logo from "$lib/components/logo.svelte";

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
        url: "/dashboard/organization",
        icon: DashboardSquare01Icon,
      },
      {
        name: "Perfil",
        url: "/dashboard/organization/profile",
        icon: User02Icon,
      },
      {
        name: "Utilizador",
        url: "/dashboard/organization/persons",
        icon: AddTeamIcon,
      },
      {
        name: "Permissões",
        url: "/dashboard/organization/permission",
        icon: Layers01Icon,
      },
      {
        name: "Cargos",
        url: "/dashboard/organization/role",
        icon: Briefcase01Icon,
      },
      {
        name: "Produtos",
        url: "/dashboard/organization/products",
        icon: ProductLoadingIcon,
      },
      {
        name: "Catálogos",
        url: "/dashboard/organization/catalog",
        icon: Layers01Icon,
      },
      {
        name: "Pagamentos",
        url: "/dashboard/organization/payments",
        icon: MoneyBag01Icon,
      },
    ],
  });
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header class="flex items-center justify-center">
    <div class="group-data-[state=expanded]:block hidden">
      <Logo />
    </div>
    <div
      class="group-data-[state=collapsed]:flex hidden h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm"
    >
      N
    </div>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMenus items={data.menus} />
  </Sidebar.Content>
  <Sidebar.Rail />
  <Sidebar.Footer>
    <NavUser user={data.user} />
  </Sidebar.Footer>
</Sidebar.Root>
