<script lang="ts">
  import {
    PLAN_RESPONSE_EMPTY,
    type PlanFilterQueryParamInput,
    type PlanResponse,
  } from "$lib/feature/admin/plan/data/model/plan.model";
  import { PlanService } from "$lib/feature/admin/plan/data/service/plan.service";
  import { useGetPlanFilterPaginate } from "../../data/hooks/use-get-filter-paginate.ts";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createPlanTable } from "./use-plan-table.svelte.ts";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import PlanDataTableActions from "./plan-data-table-actions.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type {
    PlanFormAction,
    PlanFormItem,
  } from "../form/plan-form.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import PlanForm from "../form/plan-form.svelte";
  import { PLAN_FILTER } from "../../data/hooks/keys.ts";

  let filter = $state<PlanFilterQueryParamInput>({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let service = new PlanService();

  let baseQuery = $derived(
    useGetPlanFilterPaginate({
      service,
      filter,
    }),
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [PLAN_FILTER] });
  };

  const onPageSizeChange = (pageSize: number) => {
    filter = { ...filter, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [PLAN_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [PLAN_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [PLAN_FILTER] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  let item = $state<PlanFormItem>({
    plan: PLAN_RESPONSE_EMPTY,
    action: "create",
    open: false,
  });

  const onHandler = (
    plan: PlanResponse,
    action: PlanFormAction,
  ) => {
    item = { plan, action, open: true };
  };

  const columns: ColumnDef<PlanResponse>[] = [
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
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) => `${row.original.price.toFixed(2)} Kz`,
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => `${row.original.type}`,
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => `${row.original.description ?? "-"}`,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(PlanDataTableActions, {
          plan: row.original,
          onAction: onHandler,
        }),
    },
  ];

  const tableState = $derived(
    createPlanTable({
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
      ["TYPE", "Tipo"],
    ])}
  >
    {#snippet controls()}
      <PlanForm
        {item}
        onClose={() => {
          item = {
            plan: PLAN_RESPONSE_EMPTY,
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
    title="Planos"
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