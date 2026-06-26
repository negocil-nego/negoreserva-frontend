<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Cancel01Icon, UnfoldMoreIcon } from "@hugeicons/core-free-icons";
  import type { OrgRoleItem } from "../data/model/person";

  let {
    items = $bindable<OrgRoleItem[]>([]),
    selected = $bindable<OrgRoleItem[]>([]),
    placeholder = "Selecionar...",
  }: {
    items: OrgRoleItem[];
    selected: OrgRoleItem[];
    placeholder?: string;
  } = $props();

  let open = $state(false);

  function toggle(item: OrgRoleItem) {
    if (selected.some((r) => r.uuid === item.uuid)) {
      selected = selected.filter((r) => r.uuid !== item.uuid);
    } else {
      selected = [...selected, item];
    }
  }

  function remove(uuid: string) {
    selected = selected.filter((r) => r.uuid !== uuid);
  }

  function handleEscape(e: KeyboardEvent) {
    if (e.key === "Escape") open = false;
  }

  $effect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  });
</script>

<div class="relative">
  <button
    type="button"
    role="combobox"
    aria-expanded={open}
    aria-controls="role-multi-select-list"
    onclick={() => (open = !open)}
    class="border-input bg-input/30 flex w-full min-h-9 items-center gap-1.5 border px-3 py-1.5 text-sm transition-colors focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 outline-none"
  >
    {#if selected.length === 0}
      <span class="text-muted-foreground flex-1 text-left">{placeholder}</span>
    {:else}
      <div class="flex flex-1 flex-wrap items-center gap-1">
        {#each selected as item (item.uuid)}
          <Badge variant="secondary" class="gap-1 px-1.5 py-0.5 text-xs font-normal max-w-40">
            <span class="truncate">{item.name}</span>
            <button
              type="button"
              onclick={() => remove(item.uuid)}
              class="inline-flex cursor-pointer items-center text-muted-foreground hover:text-foreground shrink-0"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={2} />
            </button>
          </Badge>
        {/each}
      </div>
    {/if}
    <HugeiconsIcon icon={UnfoldMoreIcon} strokeWidth={2} class="text-muted-foreground size-4 shrink-0 pointer-events-none" />
  </button>

  {#if open}
    <div id="role-multi-select-list" class="absolute z-50 mt-1 w-full bg-popover text-popover-foreground border shadow-sm max-h-60 overflow-auto">
      {#if items.length === 0}
        <div class="px-3 py-2 text-sm text-muted-foreground">Nenhum cargo disponivel</div>
      {:else}
        {#each items as item (item.uuid)}
          <button
            type="button"
            role="option"
            aria-selected={selected.some((r) => r.uuid === item.uuid)}
            onclick={() => toggle(item)}
            class="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors aria-selected:bg-muted/50"
          >
            <Checkbox checked={selected.some((r) => r.uuid === item.uuid)} class="pointer-events-none" />
            <span>{item.name}</span>
          </button>
        {/each}
      {/if}
    </div>

    <div role="presentation" class="fixed inset-0 z-40" onclick={() => (open = false)}></div>
  {/if}
</div>
