<script lang="ts">
  import SlashIcon from "@lucide/svelte/icons/slash";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { goto } from "$app/navigation";
  import {
    ROUTE_SIGNUP_CLIENT,
    ROUTE_SIGNUP_ORGANIZATION,
  } from "$lib/data/route";
  import { resolve } from "$app/paths";

  let { title } = $props<{
    title: string;
  }>();

  const navigateToClientLogin = () => {
    goto(resolve(ROUTE_SIGNUP_CLIENT));
  };

  const navigateToOrganizationLogin = () => {
    goto(resolve(ROUTE_SIGNUP_ORGANIZATION));
  };
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="flex items-center gap-1">
          Criar conta
          <ChevronDownIcon class="size-4" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Item onclick={navigateToClientLogin}>
            Cliente
          </DropdownMenu.Item>
          <DropdownMenu.Item onclick={navigateToOrganizationLogin}>
            Organização
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>{title}</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
