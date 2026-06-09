<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import {HugeiconsIcon, type IconSvgElement} from "@hugeicons/svelte";

  type NavLinkMenuProps = {
    onClick?: (name: string) => void;
    icon: IconSvgElement;
    name: string;
    url: string;
  }

  let {
    items,
    activeId = $bindable(""),
  }: {
    items: NavLinkMenuProps[];
    activeId?: string;
  } = $props();

  const scrollToSection = (item: NavLinkMenuProps) => {
    const el = document.getElementById(item.url);
    activeId = item.url;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
</script>

<Sidebar.Group>
  <Sidebar.GroupLabel>Menus</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each items as item (item.name)}
      <Sidebar.MenuItem class="md:space-y-2 lg:space-y-4">
        <button
          onclick={() => {
            if(item.onClick) item.onClick(item.name)
            scrollToSection(item)
          }}
          class="flex w-full items-center gap-2 rounded-lg px-3 py-2 md:py-3 text-left text-sm transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer {activeId === item.url ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : ''}"
        >
          {#if item.icon}
            <HugeiconsIcon icon={item.icon} size={24} color="currentColor" strokeWidth={1} />
          {/if}
          <span>{item.name}</span>
        </button>
      </Sidebar.MenuItem>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
