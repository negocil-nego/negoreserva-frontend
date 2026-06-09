<script lang="ts" module>
  import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
  import AudioWaveformIcon from "@lucide/svelte/icons/audio-waveform";
  import CommandIcon from "@lucide/svelte/icons/command";
</script>

<script lang="ts">
  import NavUser from "../nav-user.svelte";
  import TeamSwitcher from "../../team-switcher.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import type { ComponentProps } from "svelte";
  import NavMenus from "../nav-menus.svelte";

  import {
    Building04Icon,
    ChartRelationshipIcon,
    City02Icon,
    DashboardSquare01Icon, File01Icon,
    Layers01Icon, MoneyBag01Icon,
    ProductLoadingIcon, User02Icon
  } from "@hugeicons/core-free-icons";

  let {
    ref = $bindable(null),
    collapsible = "icon",
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> = $props();

  const data = {
    user: {
      name: "Sedrac Lucas",
      email: "m@example.com",
      avatar: "/avatar.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEndIcon,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveformIcon,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: CommandIcon,
        plan: "Free",
      },
    ],
    menus: [
      {
        name: "Dashboard",
        url: "/dashboard/admin",
        icon: DashboardSquare01Icon,
      },
      {
        name: "Categorias",
        url: "/dashboard/admin/categories",
        icon: ChartRelationshipIcon,
      },
      {
        name: "Planos",
        url: "/dashboard/admin/plans",
        icon: Layers01Icon,
      },
      {
        name: "Organizações",
        url: "/dashboard/admin/organizations",
        icon: City02Icon,
      },
      {
        name: "Produtos",
        url: "/dashboard/admin/products",
        icon: ProductLoadingIcon,
      },
      {
        name: "Pagamentos",
        url: "/dashboard/admin/payments",
        icon: MoneyBag01Icon,
      },
      {
        name: "Pessoas",
        url: "/dashboard/admin/persons",
        icon: User02Icon,
      },
      {
        name: "Arquivos de Produto",
        url: "/dashboard/admin/productfiles",
        icon: File01Icon,
      },
      {
        name: "Inquilinos",
        url: "/dashboard/admin/tenants",
        icon: Building04Icon,
      },
    ],
  };
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header>
    <NavUser user={data.user as any} />
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMenus items={data.menus} />
  </Sidebar.Content>
  <Sidebar.Footer>
    <TeamSwitcher teams={data.teams} />
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
