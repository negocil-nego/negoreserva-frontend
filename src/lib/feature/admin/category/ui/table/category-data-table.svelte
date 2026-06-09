<script lang="ts">
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createCategoryTable } from "./use-category-table.svelte.ts";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import CategoryDataTableActions from "./category-data-table-actions.svelte";
  import CategoryImportButton from "../modal/category-import-button.svelte";
  import CategoryExportButton from "../modal/category-export-button.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type {
    CategoryFormAction,
    CategoryFormItem,
  } from "../form/category-form.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import CategoryForm from "../form/category-form.svelte";
  import { CategoryService } from "../../data/service/category.service.ts";
  import { useAdminGetCategoryFilterPaginate } from "../../data/hooks/use-get-filter-paginate.ts";
  import {
    CATEGORY_RESPONSE_EMPTY,
    type CategoryFilterQueryParamInput,
    type CategoryResponse,
  } from "$lib/feature/shared/category/model/category.model";
  import { ADMIN_CATEGORY_FILTER } from "../../data/hooks/keys.ts";

  let filter = $state<CategoryFilterQueryParamInput>({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let service = new CategoryService();

  let baseQuery = $derived(
    useAdminGetCategoryFilterPaginate({
      service,
      filter,
    }),
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [ADMIN_CATEGORY_FILTER] });
  };

  const onPageSizeChange = (pageSize: number) => {
    filter = { ...filter, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_CATEGORY_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_CATEGORY_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_CATEGORY_FILTER] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  let item = $state<CategoryFormItem>({
    category: CATEGORY_RESPONSE_EMPTY,
    action: "create",
    open: false,
  });

  const onHandler = (
    category: CategoryResponse,
    action: CategoryFormAction,
  ) => {
    item = { category, action, open: true };
  };

  const columns: ColumnDef<CategoryResponse>[] = [
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
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => `${row.original.description ?? "-"}`,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(CategoryDataTableActions, {
          category: row.original,
          onAction: onHandler,
        }),
    },
  ];

  const tableState = $derived(
    createCategoryTable({
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
      ["DESCRIPTION", "Descrição"],
    ])}
  >
    {#snippet controls()}
      <CategoryForm
        {item}
        onClose={() => {
          item = {
            category: CATEGORY_RESPONSE_EMPTY,
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
    title="Categorias"
  >
    {#snippet controls()}
      <CategoryExportButton />
      <CategoryImportButton />
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
