<script lang="ts">
  import {
    PRODUCTFILE_RESPONSE_EMPTY,
    type ProductFileResponse,
  } from "$lib/feature/admin/productfile/data/model/productfile.model";
  import { ProductFileService } from "$lib/feature/admin/productfile/data/service/productfile.service";
  import { useGetProductFilePaginate } from "../../data/hooks/use-get-paginate.ts";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createProductFileTable } from "./use-productfile-table.svelte.ts";
  import TableFiltersControl from "$lib/components/table/table-filters-control.svelte";
  import ProductFileDataTableActions from "./productfile-data-table-actions.svelte";
  import ProductFileImportButton from "../modal/productfile-import-button.svelte";
  import ProductFileExportButton from "../modal/productfile-export-button.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type {
    ProductFileFormAction,
    ProductFileFormItem,
  } from "../form/productfile-form.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import ProductFileForm from "../form/productfile-form.svelte";
  import { PRODUCTFILE_FINDALL } from "../../data/hooks/keys.ts";
  import type { PaginateRequest } from "$lib/feature/admin/productfile/data/model/productfile.model";

  let request = $state<PaginateRequest>({
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let service = new ProductFileService();

  let baseQuery = $derived(
    useGetProductFilePaginate({
      service,
      request,
    }),
  );

  const onPageChange = (page: number) => {
    request = { ...request, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [PRODUCTFILE_FINDALL] });
  };

  const onPageSizeChange = (pageSize: number) => {
    request = { ...request, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [PRODUCTFILE_FINDALL] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  let item = $state<ProductFileFormItem>({
    productfile: PRODUCTFILE_RESPONSE_EMPTY,
    action: "create",
    open: false,
  });

  const onHandler = (
    productfile: ProductFileResponse,
    action: ProductFileFormAction,
  ) => {
    item = { productfile, action, open: true };
  };

  const columns: ColumnDef<ProductFileResponse>[] = [
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
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => `${row.original.product.name ?? "-"}`,
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => `${row.original.type}`,
    },
    {
      accessorKey: "url",
      header: "URL",
      cell: ({ row }) => `${row.original.url}`,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(ProductFileDataTableActions, {
          productfile: row.original,
          onAction: onHandler,
        }),
    },
  ];

  const tableState = $derived(
    createProductFileTable({
      data: () => items?.content ?? [],
      columns,
    }),
  );

  const table = $derived(tableState.table);
</script>

<div class="w-full">
  <TableFiltersControl
    {table}
    onReset={() => {}}
    onSearch={() => {}}
    {isLoading}
    placeholder="Filtrar..."
  >
    {#snippet controls()}
      <ProductFileForm
        {item}
        onClose={() => {
          item = {
            productfile: PRODUCTFILE_RESPONSE_EMPTY,
            action: "create",
            open: false,
          };
        }}
      />
    {/snippet}
  </TableFiltersControl>

  <TableData
    {table}
    {columns}
    {isLoading}
    isEmpty={!items?.content?.length}
    title="Arquivos de Produto"
  >
    {#snippet controls()}
      <ProductFileExportButton />
      <ProductFileImportButton />
    {/snippet}
  </TableData>

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
</div>
