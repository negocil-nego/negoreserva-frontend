<script lang="ts">
  import {
    TENANT_RESPONSE_EMPTY,
    type TenantFilterQueryParamInput,
    type TenantResponse,
  } from "$lib/feature/admin/tenant/data/model/tenant.model";
  import { TenantService } from "$lib/feature/admin/tenant/data/service/tenant.service";
  import { useGetTenantFilterPaginate } from "../../data/hooks/use-get-filter-paginate.ts";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createTenantTable } from "./use-tenant-table.svelte.ts";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import TenantDataTableActions from "./tenant-data-table-actions.svelte";
  import TenantImportButton from "../modal/tenant-import-button.svelte";
  import TenantExportButton from "../modal/tenant-export-button.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type {
    TenantFormAction,
    TenantFormItem,
  } from "../form/tenant-form.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import TenantForm from "../form/tenant-form.svelte";
  import { TENANT_FILTER } from "../../data/hooks/keys.ts";

  let filter = $state<TenantFilterQueryParamInput>({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let service = new TenantService();

  let baseQuery = $derived(
    useGetTenantFilterPaginate({
      service,
      filter,
    }),
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [TENANT_FILTER] });
  };

  const onPageSizeChange = (pageSize: number) => {
    filter = { ...filter, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [TENANT_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [TENANT_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [TENANT_FILTER] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  let item = $state<TenantFormItem>({
    tenant: TENANT_RESPONSE_EMPTY,
    action: "create",
    open: false,
  });

  const onHandler = (
    tenant: TenantResponse,
    action: TenantFormAction,
  ) => {
    item = { tenant, action, open: true };
  };

  const columns: ColumnDef<TenantResponse>[] = [
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
      accessorKey: "code",
      header: "Código",
      cell: ({ row }) => `${row.original.code}`,
    },
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => `${row.original.name}`,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(TenantDataTableActions, {
          tenant: row.original,
          onAction: onHandler,
        }),
    },
  ];

  const tableState = $derived(
    createTenantTable({
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
      ["CODE", "Código"],
      ["NAME", "Nome"],
    ])}
  >
    {#snippet controls()}
      <TenantForm
        {item}
        onClose={() => {
          item = {
            tenant: TENANT_RESPONSE_EMPTY,
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
    title="Inquilinos"
  >
    {#snippet controls()}
      <TenantExportButton />
      <TenantImportButton />
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