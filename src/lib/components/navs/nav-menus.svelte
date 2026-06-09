<script lang="ts">
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import {HugeiconsIcon, type IconSvgElement} from "@hugeicons/svelte";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from '$app/state';

  let {
    items,
  }: {
    items: {
      name: string;
      url: string;
      icon: IconSvgElement;
    }[];
  } = $props();

  const isActive = (url: string) => page.url.pathname == url;

</script>

<Sidebar.Group>
  <Sidebar.GroupLabel>Menus</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each items as item (item.name)}
      <Collapsible.Root open={true} class="group/collapsible">
        {#snippet child({ props })}
          {@const active = isActive(item.url)}
          <Sidebar.MenuItem {...props}>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuButton
                        {...props}
                        tooltipContent={item.name}
                        onclick={() => goto(resolve(item.url as any))}
                        class="cursor-pointer rounded-none {active ? 'menu-active' : ''}"
                >
                  {#if item.icon}
                    <HugeiconsIcon
                            icon={item.icon}
                            size={24}
                            color="currentColor"
                            strokeWidth={1}
                            class={active ? "text-green-950 dark:text-white font-bold" : ""}
                    />
                  {/if}
                  <span>{item.name}</span>
                </Sidebar.MenuButton>
              {/snippet}
            </Collapsible.Trigger>
          </Sidebar.MenuItem>
        {/snippet}
      </Collapsible.Root>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
