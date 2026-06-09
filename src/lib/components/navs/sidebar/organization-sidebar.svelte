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
    AddTeamIcon, Briefcase01Icon
  } from "@hugeicons/core-free-icons";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import type { ComponentProps } from "svelte";
  import NavMenus from "../nav-menus.svelte";
  import NavUser from "../nav-user.svelte";
  import {page} from "$app/state";

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
        name: "Cargos",
        url: "/dashboard/organization/role",
        icon: Briefcase01Icon,
      },
      {
        name: "Permissões",
        url: "/dashboard/organization/permission",
        icon: Layers01Icon,
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
  <Sidebar.Header>
    <NavUser user={data.user} />
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMenus items={data.menus} />
  </Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>
