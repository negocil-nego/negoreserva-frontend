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
  import OrgPersonActions from "./org-person-actions.svelte";
  import OrgPersonFormDialog from "./org-person-form-dialog.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import type { OrgRoleSelectorItem } from "$lib/feature/org/simple-crud/org-role-selector-popover.svelte";
  import type { Person } from "../data/model/person";
  import { PersonGqlRepo } from "../data/repository/person.gql.repo";
  import { PersonService } from "../data/contract/person.service";
  import { useOrgPaginatePerson } from "../data/hooks/use-org-paginate-person";
  import { useOrgSavePerson } from "../data/hooks/use-org-save-person";
  import { useOrgUpdatePerson } from "../data/hooks/use-org-update-person";
  import { useOrgDeletePerson } from "../data/hooks/use-org-delete-person";
  import { ORG_PAGINATE_PERSON } from "../data/hooks/keys";
  import { createOrgProductTable } from "../../product/ui/table/use-product-table.svelte";

  type PersonAction = "create" | "update" | "delete";

  const EMPTY: Person = {
    uuid: "",
    name: "",
    email: "",
    phone: "",
    birthday: "",
  };

  const repo = new PersonGqlRepo();
  const service = new PersonService(repo);
  const queryClient = useQueryClient();

  let filter = $state({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });
  let form = $state<Person>({ ...EMPTY });
  let selectedRoles = $state<OrgRoleSelectorItem[]>([]);
  let action = $state<PersonAction>("create");
  let open = $state(false);

  const baseQuery = $derived(
    useOrgPaginatePerson({
      service,
      filter: { pageNumber: filter.pageNumber, pageSize: filter.pageSize },
    }),
  );
  const saveMutation = useOrgSavePerson({ service });
  const updateMutation = useOrgUpdatePerson({ service });
  const deleteMutation = useOrgDeletePerson({ service });

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

  const filteredPersons = $derived(
    filter.search
      ? items.content.filter((person) => {
          const value =
            filter.field === "EMAIL"
              ? person.email
              : filter.field === "PHONE"
                ? person.phone
                : filter.field === "BIRTHDAY"
                  ? person.birthday
                  : person.name;
          const haystack =
            filter.field === "ALL"
              ? `${person.name} ${person.email} ${person.phone} ${person.birthday ?? ""}`
              : (value ?? "");
          return haystack.toLowerCase().includes(filter.search.toLowerCase());
        })
      : items.content,
  );

  function resetForm() {
    form = { ...EMPTY };
    selectedRoles = [];
    action = "create";
  }

  function openCreate() {
    resetForm();
    open = true;
  }

  function openAction(person: Person, nextAction: "update" | "delete") {
    form = { ...person, birthday: person.birthday ?? "" };
    selectedRoles = [];
    action = nextAction;
    open = true;
  }

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [ORG_PAGINATE_PERSON] });
  };

  const onPageSizeChange = (size: number) => {
    filter = { ...filter, pageSize: size, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ORG_PAGINATE_PERSON] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ORG_PAGINATE_PERSON] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [ORG_PAGINATE_PERSON] });
  };

  async function submit() {
    if (action === "create") {
      await $saveMutation.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        birthday: form.birthday || null,
        password: "",
        roleUuid: selectedRoles[0]?.uuid ?? null,
      });
    } else if (action === "update") {
      await $updateMutation.mutateAsync({
        uuid: form.uuid,
        request: { name: form.name, birthday: form.birthday || null },
      });
    } else {
      await $deleteMutation.mutateAsync(form.uuid);
    }

    open = false;
    resetForm();
  }

  const columns: ColumnDef<Person>[] = [
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
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email,
    },
    {
      accessorKey: "phone",
      header: "Telefone",
      cell: ({ row }) => row.original.phone,
    },
    {
      accessorKey: "birthday",
      header: "Nascimento",
      cell: ({ row }) => row.original.birthday ?? "",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(OrgPersonActions, {
          person: row.original,
          onAction: openAction,
        }),
    },
  ];

  const tableState = $derived(
    createOrgProductTable({
      data: () => filteredPersons,
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
      ["BIRTHDAY", "Nascimento"],
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
    isEmpty={!filteredPersons.length}
    title="Utilizadores"
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

  <OrgPersonFormDialog
    bind:open
    bind:form
    bind:action
    bind:selectedRoles
    {isLoading}
    onSubmit={submit}
  />
</div>
