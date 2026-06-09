<script lang="ts">
  import {
    ORGANIZATION_RESPONSE_EMPTY,
    type OrganizationFilterQueryParamInput,
    type OrganizationResponse,
  } from "$lib/feature/admin/organization/data/model/organization.model";
  import { OrganizationService } from "$lib/feature/admin/organization/data/service/organization.service";
  import { useAdminGetOrganizationFilterPaginate } from "../../data/hooks/use-get-filter-paginate.ts";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createOrganizationTable } from "./use-organization-table.svelte.ts";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import OrganizationDataTableActions from "./organization-data-table-actions.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type {
    OrganizationFormAction,
    OrganizationFormItem,
  } from "../form/organization-form.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import OrganizationForm from "../form/organization-form.svelte";
  import { ADMIN_ORGANIZATION_FILTER } from "../../data/hooks/keys.ts";

  let filter = $state<OrganizationFilterQueryParamInput>({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let service = new OrganizationService();

  let baseQuery = $derived(
    useAdminGetOrganizationFilterPaginate({
      service,
      filter,
    }),
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [ADMIN_ORGANIZATION_FILTER] });
  };

  const onPageSizeChange = (pageSize: number) => {
    filter = { ...filter, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_ORGANIZATION_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_ORGANIZATION_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_ORGANIZATION_FILTER] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  let item = $state<OrganizationFormItem>({
    organization: ORGANIZATION_RESPONSE_EMPTY,
    action: "create",
    open: false,
  });

  const onHandler = (
    organization: OrganizationResponse,
    action: OrganizationFormAction,
  ) => {
    item = { organization, action, open: true };
  };

  const columns: ColumnDef<OrganizationResponse>[] = [
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
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => `${row.original.email}`,
    },
    {
      accessorKey: "phone",
      header: "Telefone",
      cell: ({ row }) => `${row.original.phone}`,
    },
    {
      accessorKey: "address",
      header: "Endereço",
      cell: ({ row }) => `${row.original.address ?? "-"}`,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(OrganizationDataTableActions, {
          organization: row.original,
          onAction: onHandler,
        }),
    },
  ];

  const tableState = $derived(
    createOrganizationTable({
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
      ["EMAIL", "Email"],
      ["PHONE", "Telefone"],
    ])}
  >
    {#snippet controls()}
      <OrganizationForm
        {item}
        onClose={() => {
          item = {
            organization: ORGANIZATION_RESPONSE_EMPTY,
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
    title="Organizações"
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
