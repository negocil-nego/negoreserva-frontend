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
  import { createOrgProductTable } from "$lib/feature/org/product/ui/table/use-product-table.svelte";
  import OrgRoleSelectorPopover, { type OrgRoleSelectorItem } from "$lib/feature/org/simple-crud/org-role-selector-popover.svelte";
  import OrgPersonActions from "./org-person-actions.svelte";
  import type { ColumnDef } from "@tanstack/table-core";

  type Person = {
    uuid: string;
    name: string;
    email: string;
    phone: string;
    birthday?: string | null;
  };
  type PersonAction = "create" | "update" | "delete";

  const EMPTY: Person = { uuid: "", name: "", email: "", phone: "", birthday: "" };

  let persons = $state<Person[]>([]);
  let totalElements = $state(0);
  let totalPages = $state(1);
  let pageNumber = $state(0);
  let pageSize = $state(10);
  let first = $state(true);
  let last = $state(true);
  let form = $state<Person>({ ...EMPTY });
  let selectedRoles = $state<OrgRoleSelectorItem[]>([]);
  let action = $state<PersonAction>("create");
  let open = $state(false);
  let loading = $state(false);
  let filter = $state({ field: "ALL", search: "", pageNumber: 0, pageSize: 10 });

  const PAGINATE = gql`
    query orgPaginatePerson($paginateRequest: PaginateRequest) {
      orgPaginatePerson(paginateRequest: $paginateRequest) {
        content {
          uuid
          name
          email
          phone
          birthday
        }
        first
        last
        number
        size
        totalElements
        totalPages
      }
    }
  `;

  const SAVE = gql`
    mutation orgSavePerson($personCreateRequest: OrgUserCreateRequest!) {
      orgSavePerson(personCreateRequest: $personCreateRequest) {
        uuid
      }
    }
  `;

  const UPDATE = gql`
    mutation orgUpdatePerson($uuid: ID!, $personUpdateRequest: OrgUserUpdateRequest!) {
      orgUpdatePerson(uuid: $uuid, personUpdateRequest: $personUpdateRequest) {
        uuid
      }
    }
  `;

  const DELETE = gql`
    mutation orgDeleteByUuidPerson($uuid: ID!) {
      orgDeleteByUuidPerson(uuid: $uuid)
    }
  `;

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

  async function load() {
    loading = true;
    try {
      const { data } = await apolloClient.query<{
        orgPaginatePerson: {
          content: Person[];
          first: boolean;
          last: boolean;
          number: number;
          size: number;
          totalElements: number;
          totalPages: number;
        };
      }>({
        query: PAGINATE,
        variables: { paginateRequest: { pageNumber: filter.pageNumber, pageSize: filter.pageSize } },
        fetchPolicy: "network-only",
      });
      const page = data?.orgPaginatePerson;
      persons = page?.content ?? [];
      totalElements = page?.totalElements ?? 0;
      totalPages = page?.totalPages ?? 1;
      pageNumber = page?.number ?? 0;
      pageSize = page?.size ?? filter.pageSize;
      first = page?.first ?? true;
      last = page?.last ?? true;
    } finally {
      loading = false;
    }
  }

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
    if (action === "create") {
      await apolloClient.mutate({
        mutation: SAVE,
        variables: {
          personCreateRequest: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            birthday: form.birthday || null,
            password: "",
            roleUuid: selectedRoles[0]?.uuid ?? null,
          },
        },
      });
    } else if (action === "update") {
      await apolloClient.mutate({
        mutation: UPDATE,
        variables: {
          uuid: form.uuid,
          personUpdateRequest: { name: form.name, birthday: form.birthday || null },
        },
      });
    } else {
      await apolloClient.mutate({ mutation: DELETE, variables: { uuid: form.uuid } });
    }

    open = false;
    resetForm();
    await load();
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

  onMount(load);
</script>

<div class="w-full">
  <TableFiltersControl
    {table}
    {onReset}
    {onSearch}
    isLoading={loading}
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
    isLoading={loading}
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
    {first}
    {last}
  />

  <Dialog.Root bind:open>
    <Dialog.Content class={["sm:max-w-[520px]", action === "delete" && "border border-red-400"]}>
      <Dialog.Header>
        <Dialog.Title class={[action === "delete" && "text-red-400"]}>
          {#if action === "create"}
            Novo utilizador
          {:else if action === "update"}
            Editar utilizador
          {:else}
            Eliminar utilizador
          {/if}
        </Dialog.Title>
        <Dialog.Description>
          {#if action === "delete"}
            Confirme a eliminacao deste utilizador.
          {:else}
            Preencha os dados do utilizador.
          {/if}
        </Dialog.Description>
      </Dialog.Header>

      <form class="space-y-3" onsubmit={(event) => { event.preventDefault(); submit(); }}>
        {#if action !== "delete"}
          <input class="w-full rounded-md border px-3 py-2 text-sm" placeholder="Nome" bind:value={form.name} required />
          <input class="w-full rounded-md border px-3 py-2 text-sm" placeholder="Email" type="email" bind:value={form.email} disabled={action === "update"} required />
          <input class="w-full rounded-md border px-3 py-2 text-sm" placeholder="Telefone" bind:value={form.phone} disabled={action === "update"} required />
          <input class="w-full rounded-md border px-3 py-2 text-sm" type="date" bind:value={form.birthday} />

          {#if action === "create"}
            <OrgRoleSelectorPopover selected={selectedRoles} onChange={(roles) => selectedRoles = roles} />
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
