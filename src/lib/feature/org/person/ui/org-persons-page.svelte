<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import TableData from "$lib/components/table/table-data.svelte";
  import TableFiltersControl, { type SearchProps } from "$lib/components/table/table-filters-control.svelte";
  import TableLabelCreate from "$lib/components/table/table-label-create.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import { createOrgProductTable } from "$lib/feature/org/product/ui/table/use-product-table.svelte";
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

  type PersonAction = "create" | "update" | "delete";

  const EMPTY: Person = { uuid: "", name: "", email: "", phone: "", birthday: "" };

  const repo = new PersonGqlRepo();
  const service = new PersonService(repo);

  let pageNumber = $state(0);
  let pageSize = $state(10);
  let filter = $state({ field: "ALL", search: "", pageNumber: 0, pageSize: 10 });

  const personsQuery = useOrgPaginatePerson({ service, pageNumber, pageSize });
  const saveMutation = useOrgSavePerson({ service });
  const updateMutation = useOrgUpdatePerson({ service });
  const deleteMutation = useOrgDeletePerson({ service });

  let form = $state<Person>({ ...EMPTY });
  let selectedRoles = $state<OrgRoleSelectorItem[]>([]);
  let action = $state<PersonAction>("create");
  let open = $state(false);

  const persons = $derived($personsQuery.data?.content ?? []);
  const totalElements = $derived($personsQuery.data?.totalElements ?? 0);
  const totalPages = $derived($personsQuery.data?.totalPages ?? 1);
  const isLoading = $derived($personsQuery.isLoading || $saveMutation.isLoading || $updateMutation.isLoading || $deleteMutation.isLoading);

  const filteredPersons = $derived(
    filter.search
      ? persons.filter((person) => {
          const value =
            filter.field === "EMAIL" ? person.email :
            filter.field === "PHONE" ? person.phone :
            filter.field === "BIRTHDAY" ? person.birthday :
            person.name;
          const haystack = filter.field === "ALL"
            ? `${person.name} ${person.email} ${person.phone} ${person.birthday ?? ""}`
            : (value ?? "");
          return haystack.toLowerCase().includes(filter.search.toLowerCase());
        })
      : persons,
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

  const onPageChange = async (page: number) => {
    pageNumber = page;
    filter = { ...filter, pageNumber: page };
  };

  const onPageSizeChange = async (size: number) => {
    pageSize = size;
    filter = { ...filter, pageSize: size, pageNumber: 0 };
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search };
  };

  const onReset = () => {
    filter = { ...filter, field: "ALL", search: "" };
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
    isLoading={isLoading}
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
    isLoading={isLoading}
    isEmpty={!filteredPersons.length}
    title="Utilizadores"
  />

  <TablePagination
    {onPageSizeChange}
    {onPageChange}
    {totalElements}
    {totalPages}
    page={pageNumber}
    size={pageSize}
    first={$personsQuery.data?.first ?? true}
    last={$personsQuery.data?.last ?? true}
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
