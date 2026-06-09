<script lang="ts">
  import {
    PERSON_RESPONSE_EMPTY,
    type PersonFilterQueryParamInput,
    type PersonResponse,
  } from "$lib/feature/admin/person/data/model/person.model";
  import { PersonService } from "$lib/feature/admin/person/data/service/person.service";
  import { useAdminGetPersonFilterPaginate } from "../../data/hooks/use-get-filter-paginate.ts";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createPersonTable } from "./use-person-table.svelte.ts";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import PersonDataTableActions from "./person-data-table-actions.svelte";
  import PersonImportButton from "../modal/person-import-button.svelte";
  import PersonExportButton from "../modal/person-export-button.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type {
    PersonFormAction,
    PersonFormItem,
  } from "../form/person-form.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import PersonForm from "../form/person-form.svelte";
  import { ADMIN_PERSON_FILTER } from "../../data/hooks/keys.ts";

  let filter = $state<PersonFilterQueryParamInput>({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let service = new PersonService();

  let baseQuery = $derived(
    useAdminGetPersonFilterPaginate({
      service,
      filter,
    }),
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [ADMIN_PERSON_FILTER] });
  };

  const onPageSizeChange = (pageSize: number) => {
    filter = { ...filter, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_PERSON_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_PERSON_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [ADMIN_PERSON_FILTER] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  let item = $state<PersonFormItem>({
    person: PERSON_RESPONSE_EMPTY,
    action: "create",
    open: false,
  });

  const onHandler = (person: PersonResponse, action: PersonFormAction) => {
    item = { person, action, open: true };
  };

  const columns: ColumnDef<PersonResponse>[] = [
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
      accessorKey: "birthday",
      header: "Data de Nascimento",
      cell: ({ row }) => `${row.original.birthday}`,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(PersonDataTableActions, {
          person: row.original,
          onAction: onHandler,
        }),
    },
  ];

  const tableState = $derived(
    createPersonTable({
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
      <PersonForm
        {item}
        onClose={() => {
          item = {
            person: PERSON_RESPONSE_EMPTY,
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
    title="Pessoas"
  >
    {#snippet controls()}
      <PersonExportButton />
      <PersonImportButton />
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
