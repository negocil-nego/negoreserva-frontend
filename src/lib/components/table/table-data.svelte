<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import { FlexRender } from "$lib/components/ui/data-table/index.js";
  import { type ColumnDef } from "@tanstack/table-core";
  import type { Snippet } from "svelte";

  let {
    table,
    columns,
    title,
    isLoading = false,
    isEmpty = false,
    controls,
  }: {
    table: any;
    title: string;
    columns: ColumnDef<any>[];
    isLoading: boolean;
    isEmpty: boolean;
    controls?: Snippet;
  } = $props();
</script>

<div class="rounded-md border bg-panel">
  <div class="flex items-center justify-between w-full md:flex-row">
    {#if title}
      <div class="p-2 md:p-4">
        <div class="text-lg font-semibold">{title}</div>
      </div>
    {/if}
    {#if controls}
      <div class="flex items-center gap-2 p-2 md:p-4">{@render controls()}</div>
    {/if}
  </div>
  <div class="overflow-auto border-t">
    <Table.Root>
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row>
            {#each headerGroup.headers as header (header.id)}
              <Table.Head class="[&:has([role=checkbox])]:ps-3">
                {#if !header.isPlaceholder}
                  <FlexRender
                    content={header.column.columnDef.header}
                    context={header.getContext()}
                  />
                {/if}
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>
      <Table.Body>
        {#if isLoading}
          <Table.Row>
            <Table.Cell colspan={columns.length} class="h-24 text-center">
              Carregando...
            </Table.Cell>
          </Table.Row>
        {:else if isEmpty}
          <Table.Row>
            <Table.Cell colspan={columns.length} class="h-24 text-center">
              Nenhum resultado.
            </Table.Cell>
          </Table.Row>
        {:else}
          {#each table.getRowModel().rows as row (row.id)}
            <Table.Row data-state={row.getIsSelected() && "selected"}>
              {#each row.getVisibleCells() as cell (cell.id)}
                <Table.Cell class="[&:has([role=checkbox])]:ps-3">
                  <FlexRender
                    content={cell.column.columnDef.cell}
                    context={cell.getContext()}
                  />
                </Table.Cell>
              {/each}
            </Table.Row>
          {/each}
        {/if}
      </Table.Body>
    </Table.Root>
  </div>
</div>
