<script lang="ts">
  import { tick } from "svelte";
  import type { ProductSuggestionResponse } from "../../data/model/product-suggestion.model";
  import { CategoryTypeLabel } from "$lib/feature/pub/category/data/types";

  let {
    value = $bindable(""),
    readOnly = false,
    suggestions = [],
    id = "product-name",
    placeholder = "Ex: Reserva de Quarto Standard",
    required = false,
  }: {
    value: string;
    readOnly?: boolean;
    suggestions?: ProductSuggestionResponse[];
    id?: string;
    placeholder?: string;
    required?: boolean;
  } = $props();

  let inputEl: HTMLInputElement | null = $state(null);
  let open = $state(false);
  let activeIndex = $state(-1);
  let containerEl: HTMLDivElement | null = $state(null);

  type FlatOption = { label: string; category: string };
  type GroupedOption = { category: string; items: string[] };

  const flatOptions = $derived<FlatOption[]>(
    suggestions.flatMap((group) =>
      group.products.map((product) => ({
        label: product,
        category: CategoryTypeLabel[group.categoryType] ?? group.categoryType,
      })),
    ),
  );

  const filtered = $derived<FlatOption[]>(
    value.trim().length === 0
      ? flatOptions
      : flatOptions.filter((opt) =>
          opt.label.toLowerCase().includes(value.toLowerCase()),
        ),
  );

  const grouped = $derived<GroupedOption[]>(
    filtered.reduce<GroupedOption[]>((acc, opt) => {
      const existing = acc.find((g) => g.category === opt.category);
      if (existing) {
        existing.items.push(opt.label);
      } else {
        acc.push({ category: opt.category, items: [opt.label] });
      }
      return acc;
    }, []),
  );

  function getFlatIndex(category: string, item: string): number {
    return filtered.findIndex(
      (o) => o.category === category && o.label === item,
    );
  }

  function openDropdown() {
    if (!readOnly && flatOptions.length > 0) {
      open = true;
      activeIndex = -1;
    }
  }

  function closeDropdown() {
    open = false;
    activeIndex = -1;
  }

  function select(label: string) {
    value = label;
    closeDropdown();
    inputEl?.focus();
  }

  function handleInput() {
    open = true;
    activeIndex = -1;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") openDropdown();
      return;
    }

    const labels = filtered.map((o) => o.label);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, labels.length - 1);
      scrollActiveIntoView();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, -1);
      scrollActiveIntoView();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && labels[activeIndex]) {
        select(labels[activeIndex]);
      }
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  }

  async function scrollActiveIntoView() {
    await tick();
    const el = containerEl?.querySelector<HTMLElement>(
      `[data-idx="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }

  function handleBlur() {
    setTimeout(() => {
      if (!containerEl?.contains(document.activeElement)) {
        closeDropdown();
      }
    }, 150);
  }
</script>

<div class="relative w-full" bind:this={containerEl}>
  <div class="relative">
    <input
      {id}
      bind:this={inputEl}
      bind:value
      {placeholder}
      {required}
      disabled={readOnly}
      autocomplete="off"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={open ? `${id}-listbox` : undefined}
      aria-activedescendant={activeIndex >= 0
        ? `${id}-option-${activeIndex}`
        : undefined}
      oninput={handleInput}
      onfocus={openDropdown}
      onblur={handleBlur}
      onkeydown={handleKeydown}
      class="border-input bg-input/30 flex h-9 w-full border px-3 py-1 pr-8 text-sm shadow-xs transition-colors
             placeholder:text-muted-foreground
             focus-visible:outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50
             disabled:cursor-not-allowed disabled:opacity-50"
    />

    <button
      type="button"
      tabindex="-1"
      aria-hidden="true"
      disabled={readOnly}
      onclick={() => (open ? closeDropdown() : openDropdown())}
      class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600
             dark:hover:text-slate-300 transition-colors disabled:pointer-events-none"
    >
      <svg
        class="h-4 w-4 transition-transform duration-200 {open
          ? 'rotate-180'
          : ''}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>

  {#if open && filtered.length > 0}
    <div
      id="{id}-listbox"
      role="listbox"
      class="absolute z-50 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg
             dark:border-slate-700 dark:bg-slate-900
             max-h-64 overflow-y-auto
             animate-in fade-in-0 zoom-in-95 duration-100"
    >
      {#each grouped as group (group.category)}
        <div
          class="sticky top-0 z-10 flex items-center gap-2 px-3 py-1.5
                 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm
                 border-b border-slate-100 dark:border-slate-700"
        >
          <span
            class="text-[10px] font-semibold uppercase tracking-widest
                   text-slate-400 dark:text-slate-500"
          >
            {group.category}
          </span>
        </div>

        {#each group.items as item (group.category + ":" + item)}
          {@const flatIdx = getFlatIndex(group.category, item)}
          <div
            id="{id}-option-{flatIdx}"
            role="option"
            aria-selected={value === item}
            data-idx={flatIdx}
            onmousedown={(e) => {
              e.preventDefault();
              select(item);
            }}
            onmousemove={() => (activeIndex = flatIdx)}
            class="flex items-center justify-between px-3 py-2 cursor-pointer text-sm
                   transition-colors duration-75 select-none
                   {activeIndex === flatIdx
              ? 'bg-primary/10 text-primary dark:bg-primary/20'
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}
                   {value === item ? 'font-medium' : ''}"
          >
            <span class="flex-1 truncate">{item}</span>
            {#if value === item}
              <svg
                class="h-4 w-4 shrink-0 ml-2 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clip-rule="evenodd"
                />
              </svg>
            {/if}
          </div>
        {/each}
      {/each}
    </div>
  {/if}

  {#if open && filtered.length === 0 && value.trim().length > 0}
    <div
      class="absolute z-50 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg
             dark:border-slate-700 dark:bg-slate-900 px-3 py-4 text-center"
    >
      <p class="text-sm text-slate-400 dark:text-slate-500">
        Nenhuma sugestão encontrada
      </p>
    </div>
  {/if}
</div>
