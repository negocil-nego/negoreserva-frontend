<script lang="ts">
  import { gql } from "@apollo/client/core";
  import { onMount } from "svelte";
  import { apolloClient } from "$lib/providers/graphql.provider";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import TableData from "$lib/components/table/table-data.svelte";
  import TableFiltersControl, { type SearchProps } from "$lib/components/table/table-filters-control.svelte";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableText from "$lib/components/table/table-text.svelte";
  import { createOrgProductTable } from "../product/ui/table/use-product-table.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import OrgNameCrudActions from "./org-name-crud-actions.svelte";
  import OrgPermissionSelectorPopover, { type OrgPermissionSelectorItem } from "./org-permission-selector-popover.svelte";

  type Item = { uuid: string; name: string; description?: string | null };
  type FormAction = "create" | "update" | "delete";

  let {
    title,
    resource,
    requestName,
  }: {
    title: string;
    resource: "Role" | "Permission";
    requestName: "roleRequest" | "permissionRequest";
  } = $props();

  let filter = $state({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  let items = $state<Item[]>([]);
  let totalElements = $state(0);
  let totalPages = $state(1);
  let pageNumber = $state(0);
  let pageSize = $state(10);
  let first = $state(true);
  let last = $state(true);
  let form = $state<Item>({ uuid: "", name: "", description: "" });
  let action = $state<FormAction>("create");
  let open = $state(false);
  let selectedPermissions = $state<OrgPermissionSelectorItem[]>([]);
  let isLoading = $state(false);

  let PAGINATE = $derived(gql`
    query orgPaginateNameCrud($paginateRequest: PaginateRequest) {
      orgPaginate${resource}(paginateRequest: $paginateRequest) {
        content {
          uuid
          name
          description
        }
        first
        last
        number
        size
        totalElements
        totalPages
      }
    }
  `);

  let SAVE = $derived(gql`
    mutation orgSaveNameCrud($request: Org${resource}Request!) {
      orgSave${resource}(${requestName}: $request) {
        uuid
      }
    }
  `);

  let UPDATE = $derived(gql`
    mutation orgUpdateNameCrud($uuid: ID!, $request: Org${resource}Request!) {
      orgUpdate${resource}(uuid: $uuid, ${requestName}: $request) {
        uuid
      }
    }
  `);

  let DELETE = $derived(gql`
    mutation orgDeleteNameCrud($uuid: ID!) {
      orgDeleteByUuid${resource}(uuid: $uuid)
    }
  `);

  const filteredItems = $derived(
    filter.search
      ? items.filter((item) => {
          const value = filter.field === "DESCRIPTION" ? item.description : item.name;
          const haystack = filter.field === "ALL" ? `${item.name} ${item.description ?? ""}` : (value ?? "");
          return haystack.toLowerCase().includes(filter.search.toLowerCase());
        })
      : items,
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

  function openAction(item: Item, nextAction: FormAction) {
    form = { ...item, description: item.description ?? "" };
    selectedPermissions = [];
    action = nextAction;
    open = true;
  }

  async function load() {
    isLoading = true;
    try {
      const key = `orgPaginate${resource}`;
      const { data } = await apolloClient.query<Record<string, {
        content: Item[];
        first: boolean;
        last: boolean;
        number: number;
        size: number;
        totalElements: number;
        totalPages: number;
      }>>({
        query: PAGINATE,
        variables: { paginateRequest: { pageNumber: filter.pageNumber, pageSize: filter.pageSize } },
        fetchPolicy: "network-only",
      });
      const page = data?.[key];
      items = page?.content ?? [];
      totalElements = page?.totalElements ?? 0;
      totalPages = page?.totalPages ?? 1;
      pageNumber = page?.number ?? 0;
      pageSize = page?.size ?? filter.pageSize;
      first = page?.first ?? true;
      last = page?.last ?? true;
    } finally {
      isLoading = false;
    }
  }

  const onPageChange = async (page: number) => {
    filter = { ...filter, pageNumber: page };
    await load();
  };

  const onPageSizeChange = async (size: number) => {
    filter = { ...filter, pageSize: size, pageNumber: 0 };
    await load();
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search };
  };

  const onReset = () => {
    filter = { ...filter, field: "ALL", search: "" };
  };

  async function submit() {
    const request = {
      name: form.name,
      description: form.description || null,
      ...(resource === "Role" ? { permissionUuids: selectedPermissions.map((permission) => permission.uuid) } : {}),
    };

    if (action === "create") {
      await apolloClient.mutate({ mutation: SAVE, variables: { request } });
    } else if (action === "update") {
      await apolloClient.mutate({ mutation: UPDATE, variables: { uuid: form.uuid, request } });
    } else {
      await apolloClient.mutate({ mutation: DELETE, variables: { uuid: form.uuid } });
    }

    open = false;
    resetForm();
    await load();
  }

  const columns: ColumnDef<Item>[] = [
    {
      id: "select",
      header: ({ table }) =>
        renderComponent(DataTableCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
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
      cell: ({ row }) => renderComponent(TableText, { text: row.original.description ?? "" }),
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

  onMount(load);
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
        class="bg-brand rounded-full cursor-pointer flex items-center gap-1.5 px-4 py-2 text-white hover:bg-brand/90 transition-colors"
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
    {totalElements}
    {totalPages}
    page={pageNumber}
    size={pageSize}
    {first}
    {last}
  />

  <Dialog.Root bind:open>
    <Dialog.Content class={["sm:max-w-[520px]", action === "delete" && "border border-red-400"]}>
      <Dialog.Header>
        <Dialog.Title class={[action === "delete" && "text-red-400"]}>
          {#if action === "create"}
            Novo
          {:else if action === "update"}
            Editar
          {:else}
            Eliminar
          {/if}
        </Dialog.Title>
        <Dialog.Description>
          {#if action === "delete"}
            Confirme a eliminacao deste registo.
          {:else}
            Preencha os dados do registo.
          {/if}
        </Dialog.Description>
      </Dialog.Header>

      <form class="space-y-3" onsubmit={(event) => { event.preventDefault(); submit(); }}>
        {#if action !== "delete"}
          <input class="w-full rounded-md border px-3 py-2 text-sm" placeholder="Nome" bind:value={form.name} required />
          <textarea class="w-full rounded-md border px-3 py-2 text-sm" placeholder="Descricao" rows="4" bind:value={form.description}></textarea>

          {#if resource === "Role"}
            <OrgPermissionSelectorPopover
              selected={selectedPermissions}
              onChange={(permissions) => selectedPermissions = permissions}
            />
          {/if}
        {:else}
          <div class="rounded-md border p-3 text-sm">
            {form.name}
          </div>
        {/if}

        <Dialog.Footer>
          <Dialog.Close type="button" class={buttonVariants({ variant: "outline" })}>
            Cancelar
          </Dialog.Close>
          <button
            type="submit"
            class={buttonVariants({ variant: action === "delete" ? "destructive" : "default" })}
          >
            {#if action === "create"}
              Criar
            {:else if action === "update"}
              Guardar
            {:else}
              Eliminar
            {/if}
          </button>
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>
</div>
