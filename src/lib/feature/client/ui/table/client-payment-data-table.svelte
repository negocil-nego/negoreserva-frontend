<script lang="ts">
  import {
    type PaymentFilterQueryParamInput,
    type OrgPaymentResponse,
    PaymentStatus,
    PaymentMethod,
  } from "$lib/feature/shared/payment/data/model/payment.model";
  import { OrgPaymentService } from "$lib/feature/shared/payment/data/service/payment.service";
  import { useOrgGetPaymentFilterPaginate } from "$lib/feature/shared/payment/data/hooks/use-get-filter-paginate";
  import { userAuthStore } from "$lib/stores/user-auth.store";
  import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createOrgPaymentTable } from "$lib/feature/shared/payment/ui/table/use-payment-table.svelte";
  import TableFiltersControl, {
    type SearchProps,
  } from "$lib/components/table/table-filters-control.svelte";
  import PaymentReceiptLink from "$lib/feature/shared/payment/ui/table/payment-receipt-link.svelte";
  import TablePagination from "$lib/components/table/table-pagination.svelte";
  import TableData from "$lib/components/table/table-data.svelte";
  import type { ColumnDef } from "@tanstack/table-core";

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
    pageSize: 100, // fetch a large set to filter client-side
  });

  let { hideFilters = false, hidePagination = false }: { hideFilters?: boolean; hidePagination?: boolean } = $props();

  let service = new OrgPaymentService();
  let baseQuery = $derived(
    useOrgGetPaymentFilterPaginate({
      service,
      filter,
    }),
  );

  const clientEmail = $derived(userAuthStore.getUserAuthResponse()?.email);

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let rawItems = $derived($baseQuery?.data ?? { content: [] });

  // Filter payments client-side by user email
  let filteredItems = $derived(
    (rawItems?.content ?? []).filter((payment) => {
      if (!payment.transaction?.user) return false;
      const isMine = payment.transaction.user.email === clientEmail;
      if (!isMine) return false;

      // Apply search filter locally
      if (filter.search) {
        const search = filter.search.toLowerCase();
        const codeMatch = payment.transaction.code?.toLowerCase().includes(search);
        const nameMatch = payment.transaction.product?.name?.toLowerCase().includes(search);
        return codeMatch || nameMatch;
      }
      return true;
    })
  );

  const onSearch = ({ field, search }: SearchProps) => {
    filter = { ...filter, field, search };
  };

  const onReset = () => {
    filter = { field: "ALL", search: "", pageNumber: 0, pageSize: 100 };
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
      cell: ({ row }) => `${row.original.transaction.product?.name ?? "N/A"}`,
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
  ]);

  const tableState = $derived(
    createOrgPaymentTable({
      data: () => filteredItems,
      columns,
    }),
  );

  const table = $derived(tableState.table);

  // Client side pagination
  let pageIndex = $derived(table.getState().pagination.pageIndex);
  let pageSize = $derived(table.getState().pagination.pageSize);
  let totalElements = $derived(filteredItems.length);
  let totalPages = $derived(Math.ceil(totalElements / pageSize));
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
    ])}
  />
  {/if}

  <TableData
    {table}
    {columns}
    {isLoading}
    isEmpty={!filteredItems.length}
    title="Os Meus Pagamentos"
  />

  {#if !hidePagination && filteredItems.length > 0}
  <TablePagination
    onPageSizeChange={(size) => table.setPageSize(size)}
    onPageChange={(p) => table.setPageIndex(p)}
    {totalElements}
    {totalPages}
    page={pageIndex + 1}
    size={pageSize}
    first={pageIndex === 0}
    last={pageIndex >= totalPages - 1}
  />
  {/if}
</div>
