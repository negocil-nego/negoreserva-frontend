<script lang="ts">
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createMunicipalityTable } from "./use-municipality-table.svelte.ts";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import MunicipalityDataTableActions from "./municipality-data-table-actions.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type {
    MunicipalityFormAction,
    MunicipalityFormItem,
  } from "../form/municipality-form.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import MunicipalityForm from "../form/municipality-form.svelte";
  import { MunicipalityService } from "../../data/service/municipality.service.ts";
  import { useAdminGetMunicipalityFilterPaginate } from "../../data/hooks/use-get-filter-paginate.ts";
  import {
    MUNICIPALITY_RESPONSE_EMPTY,
    type MunicipalityFilterQueryParamInput,
    type MunicipalityResponse,
  } from "$lib/feature/shared/location/model/location.model";
  import { ADMIN_MUNICIPALITY_FILTER } from "../../data/hooks/keys.ts";

  let filter = $state<MunicipalityFilterQueryParamInput>({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let service = new MunicipalityService();

  let baseQuery = $derived(
    useAdminGetMunicipalityFilterPaginate({
      service,
      filter,
    }),
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [ADMIN_MUNICIPALITY_FILTER] });
  };

  const onPageSizeChange = (pageSize: number) => {
    filter = { ...filter, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_MUNICIPALITY_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_MUNICIPALITY_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_MUNICIPALITY_FILTER] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  let item = $state<MunicipalityFormItem>({
    municipality: MUNICIPALITY_RESPONSE_EMPTY,
    action: "create",
    open: false,
  });

  const onHandler = (
    municipality: MunicipalityResponse,
    action: MunicipalityFormAction,
  ) => {
    item = { municipality, action, open: true };
  };

  const columns: ColumnDef<MunicipalityResponse>[] = [
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
      accessorKey: "provinceLabel",
      header: "Província",
      cell: ({ row }) => `${row.original.provinceLabel}`,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(MunicipalityDataTableActions, {
          municipality: row.original,
          onAction: onHandler,
        }),
    },
  ];

  const tableState = $derived(
    createMunicipalityTable({
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
    placeholder="Filtrar municípios..."
    filterColumns={new Map([
      ["ALL", "Todos"],
      ["VALUE", "Valor"],
      ["LABEL", "Nome"],
    ])}
  >
    {#snippet controls()}
      <MunicipalityForm
        {item}
        onClose={() => {
          item = {
            municipality: MUNICIPALITY_RESPONSE_EMPTY,
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
    title="Municípios"
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
