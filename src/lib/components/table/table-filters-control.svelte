<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
  import type { Snippet } from "svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    RedoIcon,
    Search01Icon,
    BlushBrush01Icon,
    ArrowDown01FreeIcons
  } from "@hugeicons/core-free-icons";

  export type SearchProps = { field: string; search: string };

  let {
    table,
    placeholder = "Filtrar...",
    controls,
    filterColumns,
    isLoading = false,
    onSearch,
    onReset,
  }: {
    table: any;
    controls?: Snippet;
    isLoading?: boolean;
    placeholder?: string;
    filterColumns?: Map<string, string>;
    onSearch?: ({ field, search }: SearchProps) => void;
    onReset?: () => void;
  } = $props();

  let filterColumn = $state<string | null>(null);
  let columnSelect = $state("all");
  let searchValue = $state("");
  let clicked = $state(false);

  function getFilterColumnId() {
    const columns = table.getAllColumns();
    const filterableCol = columns.find(
      (col: any) =>
        col.columnDef.enableColumnFilter !== false && col.getCanFilter(),
    );
    return filterableCol?.id ?? columns[1]?.id ?? null;
  }

  $effect(() => {
    filterColumn = getFilterColumnId();
  });
</script>

<section
  class="bg-panel px-2 my-5 rounded-lg border border-gray-100 dark:border-gray-800"
>
  <div>
    <div class="text-lg font-semibold">Control</div>
  </div>
  {#if !isLoading}
    <div
      class="flex items-center flex-col md:flex-row gap-2 md:justify-between py-2 max-w-full"
    >
      <div
        class="bg-white dark:bg-gray-950/50 flex items-center p-1 rounded-full w-full md:w-8/12 gap-1"
      >
        {#if filterColumn}
          <Select.Root
            type="single"
            value={columnSelect}
            onValueChange={(v) => (columnSelect = v)}
          >
            <Select.Trigger class="">
              {filterColumns?.get(columnSelect) ?? "Todos"}
            </Select.Trigger>
            <Select.Content>
              {#each [...(filterColumns?.entries() ?? [])] as [value, label] (value)}
                <Select.Item {value}>{label}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        {/if}
        <Input
          value={searchValue}
          {placeholder}
          oninput={(e) => (searchValue = e.currentTarget.value)}
          class="w-full border-none focus-visible:ring-0"
        />
        {#if searchValue.length > 0}
          <Button
            variant="outline"
            size="icon"
            disabled={!searchValue || isLoading}
            onclick={() => {
              searchValue = "";
            }}
          >
            <HugeiconsIcon
              icon={BlushBrush01Icon}
              size={24}
              color="currentColor"
              strokeWidth={1}
            />
          </Button>
        {/if}
        {#if clicked}
          <Button
            variant="outline"
            size="icon"
            onclick={() => {
              searchValue = "";
              clicked = false;
              onReset?.();
            }}
          >
            <HugeiconsIcon
              icon={RedoIcon}
              size={24}
              color="currentColor"
              strokeWidth={1}
            />
          </Button>
        {/if}
        <Button
          class="bg-brand"
          disabled={!searchValue || isLoading}
          onclick={() => {
            clicked = !clicked;
            onSearch?.({
              field: columnSelect!,
              search: searchValue,
            });
          }}
        >
          <HugeiconsIcon
            icon={Search01Icon}
            size={24}
            color="currentColor"
            strokeWidth={1}
          />
          Buscar
        </Button>
      </div>

      <div
        class="flex items-center gap-2 bg-white dark:bg-gray-950/50 p-1 rounded-full w-full md:w-auto justify-between md:justify-end"
      >
        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="outline" class="ms-auto">
                  Colunas
                  <HugeiconsIcon
                          icon={ArrowDown01FreeIcons}
                          size={24}
                          color="currentColor"
                          strokeWidth={1}
                  />
                </Button>
              {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              {#each table
                .getAllColumns()
                .filter((col: any) => col.getCanHide()) as column (column)}
                <DropdownMenu.CheckboxItem
                  class="capitalize"
                  bind:checked={
                    () => column.getIsVisible(),
                    (v) => column.toggleVisibility(!!v)
                  }
                >
                  {column.columnDef.header}
                </DropdownMenu.CheckboxItem>
              {/each}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        <div>
          {#if controls}
            {@render controls()}
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <div class="flex items-center justify-between py-2 max-w-full">
      <div
        class="flex items-center gap-2 bg-white dark:bg-gray-950/50 p-1 rounded-full"
      >
        <Skeleton class="h-8 w-32 rounded-full" />
        <Skeleton class="h-8 w-48 rounded-full" />
      </div>
    </div>
  {/if}
</section>
