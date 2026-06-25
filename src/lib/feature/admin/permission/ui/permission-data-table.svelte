<script lang="ts">
  import type { AdminPermissionResponse } from "../data/model/permission.model";
  import { AdminPermissionService } from "../data/service/permission.service";
  import { useAdminGetPermissionFilterPaginate } from "../data/hooks/use-get-filter-paginate";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import { createAdminProductTable } from "../../product/ui/table/use-product-table.svelte.ts";
  import TableData from "$lib/components/table/table-data.svelte";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import { Admin_PERMISSION_FILTER } from "../data/hooks/keys";

  let service = new AdminPermissionService();
  const queryClient = useQueryClient();

  let filter = $state({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const baseQuery = $derived(
    useAdminGetPermissionFilterPaginate({
      service,
      filter: { pageNumber: filter.pageNumber, pageSize: filter.pageSize },
    }),
  );
  const isLoading = $derived($baseQuery?.isLoading ?? false);
  const items = $derived(
    $baseQuery?.data ?? {
      content: [],
      totalElements: 0,
      totalPages: 1,
      first: true,
      last: true,
      number: 0,
      size: 10,
    },
  );

  const filteredItems = $derived(
    filter.search
      ? items.content.filter((item) => {
          const haystack = item.name;
          return haystack.toLowerCase().includes(filter.search.toLowerCase());
        })
      : items.content,
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [Admin_PERMISSION_FILTER] });
  };

  const onPageSizeChange = (size: number) => {
    filter = { ...filter, pageSize: size, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [Admin_PERMISSION_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [Admin_PERMISSION_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [Admin_PERMISSION_FILTER] });
  };

  const columns: ColumnDef<AdminPermissionResponse>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => row.original.description ?? "",
    },
  ];

  const tableState = $derived(
    createAdminProductTable({
      data: () => filteredItems,
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
    placeholder="Filtrar..."
    filterColumns={new Map([
      ["ALL", "Todos"],
      ["NAME", "Nome"],
    ])}
  />

  <TableData
    {table}
    {columns}
    {isLoading}
    isEmpty={!filteredItems.length}
    title="Permissões"
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
