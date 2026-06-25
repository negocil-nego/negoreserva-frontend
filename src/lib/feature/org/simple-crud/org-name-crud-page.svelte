<script lang="ts">
  import { useQueryClient } from "@sveltestack/svelte-query";
  import { Button } from "$lib/components/ui/button";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import TableData from "$lib/components/table/table-data.svelte";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableText from "$lib/components/table/table-text.svelte";
  import { createOrgProductTable } from "../product/ui/table/use-product-table.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import OrgNameCrudActions from "./org-name-crud-actions.svelte";
  import OrgNameCrudFormDialog from "./org-name-crud-form-dialog.svelte";
  import type {
    NameCrudItem,
    NameCrudAction,
    NameCrudResource,
  } from "./data/model/simple-crud";
  import { SimpleCrudGqlRepo } from "./data/repository/simple-crud.gql.repo";
  import { SimpleCrudService } from "./data/contract/simple-crud.service";
  import { useOrgNameCrudPaginate } from "./data/hooks/use-org-name-crud-paginate";
  import { useOrgNameCrudSave } from "./data/hooks/use-org-name-crud-save";
  import { useOrgNameCrudUpdate } from "./data/hooks/use-org-name-crud-update";
  import { useOrgNameCrudDelete } from "./data/hooks/use-org-name-crud-delete";
  import { ORG_NAME_CRUD_PAGINATE } from "./data/hooks/keys";
  import type { OrgPermissionSelectorItem } from "./org-permission-selector-popover.svelte";

  let {
    title,
    resource,
  }: {
    title: string;
    resource: NameCrudResource;
  } = $props();

  const repo = new SimpleCrudGqlRepo();
  const service = new SimpleCrudService(repo);
  const queryClient = useQueryClient();

  let filter = $state({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });
  let form = $state<NameCrudItem>({ uuid: "", name: "", description: "" });
  let action = $state<NameCrudAction>("create");
  let open = $state(false);
  let selectedPermissions = $state<OrgPermissionSelectorItem[]>([]);

  const baseQuery = $derived(
    useOrgNameCrudPaginate({
      service,
      resource,
      filter: { pageNumber: filter.pageNumber, pageSize: filter.pageSize },
    }),
  );
  const saveMutation = useOrgNameCrudSave({ service });
  const updateMutation = useOrgNameCrudUpdate({ service });
  const deleteMutation = useOrgNameCrudDelete({ service });

  const isLoading = $derived(
    $baseQuery?.isLoading ||
      $saveMutation.isLoading ||
      $updateMutation.isLoading ||
      $deleteMutation.isLoading,
  );
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
          const value =
            filter.field === "DESCRIPTION" ? item.description : item.name;
          const haystack =
            filter.field === "ALL"
              ? `${item.name} ${item.description ?? ""}`
              : (value ?? "");
          return haystack.toLowerCase().includes(filter.search.toLowerCase());
        })
      : items.content,
  );

  function resetForm() {
    form = { uuid: "", name: "", description: "" };
    selectedPermissions = [];
    action = "create";
  }

  function openCreate() {
    resetForm();
    open = true;
  }

  function openAction(item: NameCrudItem, nextAction: NameCrudAction) {
    form = { ...item, description: item.description ?? "" };
    selectedPermissions = [];
    action = nextAction;
    open = true;
  }

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [ORG_NAME_CRUD_PAGINATE] });
  };

  const onPageSizeChange = (size: number) => {
    filter = { ...filter, pageSize: size, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ORG_NAME_CRUD_PAGINATE] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ORG_NAME_CRUD_PAGINATE] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [ORG_NAME_CRUD_PAGINATE] });
  };

  async function submit() {
    const request = {
      name: form.name,
      description: form.description || null,
      ...(resource === "Role"
        ? { permissionUuids: selectedPermissions.map((p) => p.uuid) }
        : {}),
    };

    if (action === "create") {
      await $saveMutation.mutateAsync({ resource, request });
    } else if (action === "update") {
      await $updateMutation.mutateAsync({ resource, uuid: form.uuid, request });
    } else {
      await $deleteMutation.mutateAsync({ resource, uuid: form.uuid });
    }

    open = false;
    resetForm();
  }

  const columns: ColumnDef<NameCrudItem>[] = [
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
      accessorKey: "description",
      header: "Descricao",
      cell: ({ row }) =>
        renderComponent(TableText, { text: row.original.description ?? "" }),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(OrgNameCrudActions, {
          item: row.original,
          onAction: openAction,
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
    placeholder="Filtrar nomes..."
    filterColumns={new Map([
      ["ALL", "Todos"],
      ["NAME", "Nome"],
      ["DESCRIPTION", "Descricao"],
    ])}
  >
    {#snippet controls()}
      <Button
        type="button"
        class="bg-brand cursor-pointer flex items-center gap-1.5 px-4 py-2 text-white hover:bg-brand/90 transition-colors"
        onclick={openCreate}
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
    {title}
  />

  <TablePagination
    {onPageSizeChange}
    {onPageChange}
    totalElements={items.totalElements}
    totalPages={items.totalPages}
    page={items.number}
    size={items.size}
    first={items.first}
    last={items.last}
  />

  <OrgNameCrudFormDialog
    bind:open
    bind:form
    bind:action
    bind:selectedPermissions
    {resource}
    {isLoading}
    onSubmit={submit}
  />
</div>
