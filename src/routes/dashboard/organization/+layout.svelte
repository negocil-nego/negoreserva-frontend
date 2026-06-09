<script lang="ts">
  import OrganizationSidebar from "$lib/components/navs/sidebar/organization-sidebar.svelte";
  import NotificationDrawer from "$lib/components/drawer/notification-drawer.svelte";
  import SettingsDrawer from "$lib/components/drawer/settings-drawer.svelte";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import AuthExpiryCountdown from "$lib/feature/pub/auth/otp/auth-expiry-countdown.svelte";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import LinkHome from "$lib/components/navs/link-home.svelte";
  let { children } = $props();
</script>

<Sidebar.Provider>
  <OrganizationSidebar />
  <Sidebar.Inset>
    <header
      class="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
    >
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ms-1" />
        <Separator
          orientation="vertical"
          class="me-2 data-[orientation=vertical]:h-4"
        />
      </div>
      <div class="flex items-center gap-5 md:gap-8">
        <LinkHome />
        <div class="px-4 flex items-center gap-2">
          <AuthExpiryCountdown />
          <DropdownTheme />
          <SettingsDrawer />
          <NotificationDrawer />
        </div>
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div class="min-h-screen flex-1 rounded-xl md:min-h-min">
        {@render children()}
      </div>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
