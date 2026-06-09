<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  //import { useSidebar } from "$lib/components/ui/sidebar/index.js";
  import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
  import BellIcon from "@lucide/svelte/icons/bell";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import CreditCardIcon from "@lucide/svelte/icons/credit-card";
  import SparklesIcon from "@lucide/svelte/icons/sparkles";
  import LogoutModal from "$lib/feature/pub/auth/logout/ui/logout-model.svelte";
  import { useMobile } from "$lib/hooks/use-mobile.svelte";
  import {
    UserType,
    type UserAuthResponse,
  } from "$lib/feature/pub/auth/register/data/model/register.model";
  import { resolve } from "$app/paths";
  import { goto } from "$app/navigation";

  let { user, isShort = false }: { user: UserAuthResponse | undefined, isShort?: boolean } = $props();
  //const sidebar = useSidebar();
  const { isMobile } = useMobile();

  const routeProfile = () => {
    if (!user) return "";
    switch (user.type) {
      case UserType.ORGANIZATION:
        return "/dashboard/organization/profile";
      case UserType.CLIENT:
        return "/dashboard/client/profile";
      case UserType.ADMIN:
        return "/dashboard/admin/profile";
      default:
        return "";
    }
  };
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            {...props}
          >
            <Avatar.Root class="size-8 rounded-lg">
              <Avatar.Image src={user?.logo} alt={user?.name} />
              <Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
            </Avatar.Root>
            {#if !isShort }
              <div class="grid flex-1 text-start text-sm leading-tight">
                <span class="truncate font-medium">{user?.name}</span>
                <span class="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDownIcon class="ms-auto size-4" />
            {/if}
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenu.Label class="p-0 font-normal">
          <div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
            <Avatar.Root class="size-8 rounded-lg">
              <Avatar.Image src={user?.logo} alt={user?.name} />
              <Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-start text-sm leading-tight">
              <span class="truncate font-medium">{user?.name}</span>
              <span class="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <SparklesIcon />
            Actualizar plano
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item
            onclick={() => goto(resolve(routeProfile() as any))}
          >
            <BadgeCheckIcon />
            Conta
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CreditCardIcon />
            Pagamento
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <BellIcon />
            Notificações
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <LogoutModal />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
