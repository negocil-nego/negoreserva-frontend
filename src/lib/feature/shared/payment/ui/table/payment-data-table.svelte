<script lang="ts">
  import {
    type PaymentFilterQueryParamInput,
    type OrgPaymentResponse,
    PaymentStatus,
    PaymentMethod,
  } from "../../data/model/payment.model";
  import { OrgPaymentService } from "../../data/service/payment.service";
  import { useOrgGetPaymentFilterPaginate } from "../../data/hooks/use-get-filter-paginate";
  import { useOrgDeletePayment } from "../../data/hooks/use-delete";
  import { useOrgValidatePaymentReceipt } from "../../data/hooks/use-validate-receipt";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createOrgPaymentTable } from "./use-payment-table.svelte.ts";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import PaymentDataTableActions from "./payment-data-table-actions.svelte";
  import PaymentReceiptLink from "./payment-receipt-link.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import { ORG_PAYMENT_FILTER } from "../../data/hooks/keys";

  const PAYMENT_LABEL: Record<string, string> = {
    [PaymentStatus.PENDING]: "Pendente",
    [PaymentStatus.PAID]: "Pago",
    [PaymentStatus.CANCELED]: "Cancelado",
    [PaymentStatus.RECEIPT_VALID]: "Comprovativo Válido",
    [PaymentMethod.NONE]: "Nenhum",
    [PaymentMethod.RECEIPT]: "Comprovativo",
    [PaymentMethod.MULTICAIXA_EXPRESS]: "Multicaixa Express",
    [PaymentMethod.REFERENCIA]: "Referência",
  };

  let filter = $state<PaymentFilterQueryParamInput>({
    field: "ALL",
    search: "",
    pageNumber: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  let { hideActions = false, hideFilters = false, hidePagination = false }: { hideActions?: boolean; hideFilters?: boolean; hidePagination?: boolean } = $props();

  let service = new OrgPaymentService();
  let deleteMutation = useOrgDeletePayment({ service });
  let validateMutation = useOrgValidatePaymentReceipt({ service });

  let baseQuery = $derived(
    useOrgGetPaymentFilterPaginate({
      service,
      filter,
    }),
  );

  const onPageChange = (page: number) => {
    filter = { ...filter, pageNumber: page };
    queryClient.invalidateQueries({ queryKey: [ORG_PAYMENT_FILTER] });
  };

  const onPageSizeChange = (pageSize: number) => {
    filter = { ...filter, pageSize, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ORG_PAYMENT_FILTER] });
  };

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search, pageNumber: 0 };
    queryClient.invalidateQueries({ queryKey: [ORG_PAYMENT_FILTER] });
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 10 };
    queryClient.invalidateQueries({ queryKey: [ORG_PAYMENT_FILTER] });
  };

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  const onDelete = (payment: OrgPaymentResponse) => {
    if (confirm("Tem a certeza que deseja eliminar este pagamento?")) {
      $deleteMutation.mutate({ uuid: payment.uuid });
    }
  };

  const onValidate = (payment: OrgPaymentResponse) => {
    if (confirm("Deseja validar o comprovativo deste pagamento?")) {
      $validateMutation.mutate({ uuid: payment.uuid });
    }
  };

  let columns = $derived<ColumnDef<OrgPaymentResponse>[]>([
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
      accessorKey: "transaction.code",
      header: "Código",
      cell: ({ row }) => `${row.original.transaction.code}`,
    },
    {
      accessorKey: "transaction.product.name",
      header: "Produto",
      cell: ({ row }) => `${row.original.transaction.product.name}`,
    },
    {
      accessorKey: "transaction.user.name",
      header: "Cliente",
      cell: ({ row }) => `${row.original.transaction.user.name}`,
    },
    {
      accessorKey: "transaction.price",
      header: "Valor",
      cell: ({ row }) =>
        `${row.original.transaction.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA', minimumFractionDigits: 2 })}`,
    },
    {
      accessorKey: "type",
      header: "Método",
      cell: ({ row }) => `${PAYMENT_LABEL[row.original.type] ?? row.original.type}`,
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => `${PAYMENT_LABEL[row.original.status] ?? row.original.status}`,
    },
    {
      id: "receipt",
      header: "Comprovativo",
      cell: ({ row }) =>
        renderComponent(PaymentReceiptLink, {
          receipt: row.original.paymentFileReceipt,
        }),
    },
    ...(hideActions ? [] : [{
      id: "actions" as const,
      enableHiding: false,
      cell: ({ row }: { row: { original: OrgPaymentResponse } }) =>
        renderComponent(PaymentDataTableActions, {
          payment: row.original,
          onValidate,
          onDelete,
        }),
    }] as ColumnDef<OrgPaymentResponse>[]),
  ]);

  const tableState = $derived(
    createOrgPaymentTable({
      data: () => items?.content ?? [],
      columns,
    }),
  );

  const table = $derived(tableState.table);
</script>

<div class="w-full">
  {#if !hideFilters}
  <TableFiltersControl
    {table}
    {onReset}
    {onSearch}
    {isLoading}
    placeholder="Filtrar pagamentos..."
    filterColumns={new Map([
      ["ALL", "Todos"],
      ["CODE", "Código"],
      ["PRODUCT", "Produto"],
      ["CLIENT", "Cliente"],
    ])}
  />
  {/if}

  <TableData
    {table}
    {columns}
    {isLoading}
    isEmpty={!items?.content?.length}
    title="Pagamentos"
  />

  {#if !hidePagination}
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
  {/if}
</div>
