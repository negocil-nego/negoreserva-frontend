<script lang="ts">
  import {
    type ProductFilterQueryParamInput,
    type OrgProductResponse,
  } from "$lib/feature/org/product/data/model/product.model";
  import { OrgProductService } from "$lib/feature/org/product/data/service/product.service";
  import { useOrgGetProductFilterPaginate } from "../../data/hooks/use-get-filter-paginate.ts";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createOrgProductTable } from "./use-product-table.svelte.ts";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import ProductDataTableActions from "./product-data-table-actions.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import TableText from "$lib/components/table/table-text.svelte";
  import type {
    ProductFormAction,
    ProductFormItem,
  } from "../../data/model/product.form";
  import { ORG_PRODUCT_FILTER } from "../../data/hooks/keys.ts";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import type { ColumnDef } from "@tanstack/table-core";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import ProductNameCell from "./product-name-cell.svelte";

  const PRODUCT_TABLE_EMPTY: OrgProductResponse = {
    uuid: "",
    name: "",
    description: "",
    files: [],
  };

  let filter = $state<ProductFilterQueryParamInput>({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let { hideActions = false, hideFilters = false, hidePagination = false }: { hideActions?: boolean; hideFilters?: boolean; hidePagination?: boolean } = $props();

  let service = new OrgProductService();

  let baseQuery = $derived(
    useOrgGetProductFilterPaginate({
      service,
      filter,
    }),
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [ORG_PRODUCT_FILTER] });
  };

  const onPageSizeChange = (pageSize: number) => {
    filter = { ...filter, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ORG_PRODUCT_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ORG_PRODUCT_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [ORG_PRODUCT_FILTER] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  let item = $state<ProductFormItem>({
    product: PRODUCT_TABLE_EMPTY,
    action: "create",
    open: false,
  });

  const onHandler = (
    product: OrgProductResponse,
    action: ProductFormAction,
  ) => {
    if (action === "delete") {
      item = { product, action, open: true };
    }
  };

  const columns: ColumnDef<OrgProductResponse>[] = [
    {
      id: "select",
      header: ({ table }) =>
        renderComponent(DataTableCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          indeterminate:
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected(),
          onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
          "aria-label": "Select all",
        }),
      cell: ({ row }) =>
        renderComponent(DataTableCheckbox, {
          checked: row.getIsSelected(),
          onCheckedChange: (value) => row.toggleSelected(!!value),
          "aria-label": "Select row",
        }),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) =>
        renderComponent(ProductNameCell, {
          name: row.original.name,
          files: row.original.files ?? [],
        }),
    },

    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) =>renderComponent(TableText, {
        text: row.original.description
      }),
    },
    ...(hideActions ? [] : [{
      id: "actions" as const,
      enableHiding: false,
      cell: ({ row }: { row: { original: OrgProductResponse } }) =>
        renderComponent(ProductDataTableActions, {
          product: row.original,
          onAction: onHandler,
        }),
    }] as ColumnDef<OrgProductResponse>[]),
  ];

  const tableState = $derived(
    createOrgProductTable({
      data: () => items?.content ?? [],
      columns,
    }),
  );

  const table = $derived(tableState.table);
</script>

<div class="w-full">
  {#if !hideFilters}
  <TableFiltersControl
    {table}
    {onReset}
    {onSearch}
    {isLoading}
    placeholder="Filtrar nomes..."
    filterColumns={new Map([
      ["ALL", "Todos"],
      ["NAME", "Nome"],
      ["TYPE", "Tipo"],
    ])}
  >
    {#snippet controls()}
      <div class="flex items-center gap-2">
        <a
          href="/dashboard/organization/products/create"
          class={buttonVariants({
            variant: "default",
            class: "bg-brand rounded-full cursor-pointer flex items-center gap-1.5 px-4 py-2 text-white hover:bg-brand/90 transition-colors",
          })}
        >
          <TableLabelCreate />
        </a>
      </div>
    {/snippet}
  </TableFiltersControl>
  {/if}

  <TableData
    {table}
    {columns}
    {isLoading}
    isEmpty={!items?.content?.length}
    title="Produtos"
  />

  {#if !hidePagination}
  <TablePagination
    {onPageSizeChange}
    {onPageChange}
    totalElements={items?.totalElements ?? 1}
    totalPages={items?.totalPages ?? 1}
    page={items?.number ?? 1}
    size={items?.size ?? 1}
    first={items?.first ?? false}
    last={items?.last ?? false}
  />
  {/if}
</div>
