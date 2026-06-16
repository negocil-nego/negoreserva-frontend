<script lang="ts">
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createProvinceTable } from "./use-province-table.svelte.ts";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import ProvinceDataTableActions from "./province-data-table-actions.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type {
    ProvinceFormAction,
    ProvinceFormItem,
  } from "../form/province-form.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import ProvinceForm from "../form/province-form.svelte";
  import { ProvinceService } from "../../data/service/province.service.ts";
  import { useAdminGetProvinceFilterPaginate } from "../../data/hooks/use-get-filter-paginate.ts";
  import {
    PROVINCE_RESPONSE_EMPTY,
    type ProvinceFilterQueryParamInput,
    type ProvinceResponse,
  } from "$lib/feature/shared/location/model/location.model";
  import { ADMIN_PROVINCE_FILTER } from "../../data/hooks/keys.ts";

  let filter = $state<ProvinceFilterQueryParamInput>({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let service = new ProvinceService();

  let baseQuery = $derived(
    useAdminGetProvinceFilterPaginate({
      service,
      filter,
    }),
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [ADMIN_PROVINCE_FILTER] });
  };

  const onPageSizeChange = (pageSize: number) => {
    filter = { ...filter, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_PROVINCE_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_PROVINCE_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_PROVINCE_FILTER] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  let item = $state<ProvinceFormItem>({
    province: PROVINCE_RESPONSE_EMPTY,
    action: "create",
    open: false,
  });

  const onHandler = (
    province: ProvinceResponse,
    action: ProvinceFormAction,
  ) => {
    item = { province, action, open: true };
  };

  const columns: ColumnDef<ProvinceResponse>[] = [
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
      accessorKey: "value",
      header: "Valor",
      cell: ({ row }) => `${row.original.value}`,
    },
    {
      accessorKey: "label",
      header: "Nome",
      cell: ({ row }) => `${row.original.label}`,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(ProvinceDataTableActions, {
          province: row.original,
          onAction: onHandler,
        }),
    },
  ];

  const tableState = $derived(
    createProvinceTable({
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
    placeholder="Filtrar províncias..."
    filterColumns={new Map([
      ["ALL", "Todos"],
      ["VALUE", "Valor"],
      ["LABEL", "Nome"],
    ])}
  >
    {#snippet controls()}
      <ProvinceForm
        {item}
        onClose={() => {
          item = {
            province: PROVINCE_RESPONSE_EMPTY,
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
    title="Províncias"
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
