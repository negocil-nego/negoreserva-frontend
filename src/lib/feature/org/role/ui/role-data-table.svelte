<script lang="ts">
  import type { OrgRoleResponse } from "../data/model/role.model";
  import { OrgRoleService } from "../data/service/role.service";
  import { useOrgGetRoleFilterPaginate } from "../data/hooks/use-get-filter-paginate";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createOrgProductTable } from "../../product/ui/table/use-product-table.svelte.ts";
  import TableData from "$lib/components/table/table-data.svelte";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { ColumnDef } from "@tanstack/table-core";
  import RoleActions from "./role-actions.svelte";
  import RoleFormDialog from "./role-form-dialog.svelte";
  import RolePermissionModal from "./role-permission-modal.svelte";
  import type { OrgPermissionSelectorItem } from "$lib/feature/org/simple-crud/org-permission-selector-popover.svelte";
  import { ORG_ROLE_FILTER } from "../data/hooks/keys";

  type FormAction = "create" | "update" | "delete";
  type RoleAction = "update" | "delete" | "permissions";

  let service = new OrgRoleService();
  const queryClient = useQueryClient();

  let filter = $state({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });
  let action = $state<FormAction>("create");

  let editItem = $state<OrgRoleResponse | null>(null);
  let showDialog = $state(false);
  let showPermissionModal = $state(false);
  let permissionRoleUuid = $state("");
  let permissionRoleName = $state("");
  let selectedPermissions = $state<OrgPermissionSelectorItem[]>([]);

  const baseQuery = $derived(
    useOrgGetRoleFilterPaginate({
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
    queryClient.invalidateQueries({ queryKey: [ORG_ROLE_FILTER] });
  };

  const onPageSizeChange = (size: number) => {
    filter = { ...filter, pageSize: size, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ORG_ROLE_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ORG_ROLE_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [ORG_ROLE_FILTER] });
  };

  function handleAction(item: OrgRoleResponse, nextAction: RoleAction) {
    if (nextAction === "permissions") {
      permissionRoleUuid = item.uuid;
      permissionRoleName = item.name;
      showPermissionModal = true;
      return;
    }
    editItem = item;
    action = nextAction;
    selectedPermissions = [];
    showDialog = true;
  }

  function handleDialogSuccess() {
    showDialog = false;
    editItem = null;
    selectedPermissions = [];
    queryClient.invalidateQueries({ queryKey: [ORG_ROLE_FILTER] });
  }

  const columns: ColumnDef<OrgRoleResponse>[] = [
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
      cell: ({ row }) => row.original.name,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(RoleActions, {
          item: row.original,
          onAction: handleAction,
        }),
    },
  ];

  const tableState = $derived(
    createOrgProductTable({
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
  >
    {#snippet controls()}
      <Button
        type="button"
        class="bg-brand cursor-pointer flex items-center gap-1.5 px-4 py-2 text-white hover:bg-brand/90 transition-colors"
        onclick={() => {
          action = "create";
          editItem = null;
          selectedPermissions = [];
          showDialog = true;
        }}
      >
        <TableLabelCreate />
      </Button>
    {/snippet}
  </TableFiltersControl>

  <TableData
    {table}
    {columns}
    {isLoading}
    isEmpty={!filteredItems.length}
    title="Funções"
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

<RoleFormDialog
  bind:open={showDialog}
  bind:item={editItem}
  bind:action
  bind:selectedPermissions
  onSuccess={handleDialogSuccess}
/>

<RolePermissionModal
  bind:open={showPermissionModal}
  roleUuid={permissionRoleUuid}
  roleName={permissionRoleName}
  onSuccess={() =>
    queryClient.invalidateQueries({ queryKey: [ORG_ROLE_FILTER] })}
/>
