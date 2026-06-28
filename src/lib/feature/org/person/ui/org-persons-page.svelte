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
  import PersonRoleModal from "./person-role-modal.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import type { Person, OrgRoleItem } from "../data/model/person";
  import { PersonGqlRepo } from "../data/repository/person.gql.repo";
  import { PersonService } from "../data/contract/person.service";
  import { useOrgPaginatePerson } from "../data/hooks/use-org-paginate-person";
  import { useOrgSavePerson } from "../data/hooks/use-org-save-person";
  import { useOrgUpdatePerson } from "../data/hooks/use-org-update-person";
  import { useOrgDeletePerson } from "../data/hooks/use-org-delete-person";
  import { ORG_PAGINATE_PERSON } from "../data/hooks/keys";
  import { createOrgProductTable } from "../../product/ui/table/use-product-table.svelte";

  type PersonAction = "create" | "update" | "delete" | "roles";

  const EMPTY: Person = {
    uuid: "",
    name: "",
    email: "",
    phone: "",
    roles: [],
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
  let selectedRoles = $state<OrgRoleItem[]>([]);
  let allRoles = $state<OrgRoleItem[]>([]);
  let action = $state<PersonAction>("create");
  let open = $state(false);

  let showRoleModal = $state(false);
  let roleModalUserUuid = $state("");
  let roleModalUserName = $state("");

  const baseQuery = $derived(
    useOrgPaginatePerson({
      service,
      filter: { pageNumber: filter.pageNumber, pageSize: filter.pageSize },
    }),
  );
  const saveMutation = useOrgSavePerson({ service });
  const updateMutation = useOrgUpdatePerson({ service });
  const deleteMutation = useOrgDeletePerson({ service });

  async function loadAllRoles() {
    try {
      allRoles = await service.findAllRoles();
    } catch {
      allRoles = [];
    }
  }

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

  $effect(() => {
    if (open) {
      loadAllRoles();
    }
  });

  const filteredPersons = $derived(
    filter.search
      ? items.content.filter((p) => {
          const value =
            filter.field === "EMAIL"
              ? p.email
              : filter.field === "PHONE"
                ? p.phone
                : p.name;
          const haystack =
            filter.field === "ALL"
              ? `${p.name} ${p.email} ${p.phone}`
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

  function openAction(
    person: Person,
    nextAction: "update" | "delete" | "roles",
  ) {
    if (nextAction === "roles") {
      roleModalUserUuid = person.uuid;
      roleModalUserName = person.name;
      showRoleModal = true;
      return;
    }
    form = { ...person };
    selectedRoles = person.roles ?? [];
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
        password: "",
        roleUuids: selectedRoles.map((r) => r.uuid),
      });
    } else if (action === "update") {
      await $updateMutation.mutateAsync({
        uuid: form.uuid,
        request: {
          name: form.name,
          roleUuids: selectedRoles.map((r) => r.uuid),
        },
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
      id: "roles",
      header: "Cargos",
      cell: ({ row }) => {
        const roles = row.original.roles ?? [];
        return roles.length > 0 ? roles.map((r) => r.name).join(", ") : "-";
      },
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
    ])}
  >
    {#snippet controls()}
      <Button
        type="button"
        class="bg-btn-create cursor-pointer flex items-center gap-1.5 px-4 py-2 text-white hover:bg-brand/90 transition-colors"
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
    bind:allRoles
    {isLoading}
    onSubmit={submit}
  />

  <PersonRoleModal
    bind:open={showRoleModal}
    userUuid={roleModalUserUuid}
    userName={roleModalUserName}
    onSuccess={() =>
      queryClient.invalidateQueries({ queryKey: [ORG_PAGINATE_PERSON] })}
  />
</div>
