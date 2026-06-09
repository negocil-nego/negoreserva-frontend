<script lang="ts">
  import {
    type ProductFilterQueryParamInput,
    type ProductResponse,
  } from "$lib/feature/admin/product/data/model/product.model";
  import { ProductService } from "$lib/feature/admin/product/data/service/product.service";
  import { useGetProductFilterPaginate } from "../../data/hooks/use-get-filter-paginate.ts";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createProductTable } from "./use-product-table.svelte.ts";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import ProductDataTableActions from "./product-data-table-actions.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type {
    ProductFormAction,
    ProductFormItem,
  } from "$lib/feature/org/product/data/model/product.form";
  import type { ColumnDef } from "@tanstack/table-core";
  import ProductForm from "../form/product-form.svelte";
  import { PRODUCT_FILTER } from "../../data/hooks/keys.ts";

  const PRODUCT_TABLE_EMPTY = {
    uuid: "",
    name: "",
    price: 0,
    description: "",
    type: "",
    organization: {
      uuid: "",
      name: "",
      email: "",
      description: "",
      phone: "",
      address: "",
    },
  };

  let filter = $state<ProductFilterQueryParamInput>({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let service = new ProductService();

  let baseQuery = $derived(
    useGetProductFilterPaginate({
      service,
      filter,
    }),
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [PRODUCT_FILTER] });
  };

  const onPageSizeChange = (pageSize: number) => {
    filter = { ...filter, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [PRODUCT_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [PRODUCT_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [PRODUCT_FILTER] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  let item = $state<ProductFormItem>({
    product: PRODUCT_TABLE_EMPTY,
    action: "create",
    open: false,
  });

  const onHandler = (
    product: ProductResponse,
    action: ProductFormAction,
  ) => {
    item = { product, action, open: true };
  };

  const columns: ColumnDef<ProductResponse>[] = [
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
      cell: ({ row }) => `${row.original.name}`,
    },
    {
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) => `${row.original.price.toFixed(2)} Kz`,
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => `${row.original.type}`,
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => `${row.original.description ?? "-"}`,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(ProductDataTableActions, {
          product: row.original,
          onAction: onHandler,
        }),
    },
  ];

  const tableState = $derived(
    createProductTable({
      data: () => items?.content ?? [],
      columns,
    }),
  );

  const table = $derived(tableState.table);
</script>

<div class="w-full">
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
      <ProductForm
        {item}
        onClose={() => {
          item = {
            product: PRODUCT_TABLE_EMPTY,
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
    title="Produtos"
  />

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