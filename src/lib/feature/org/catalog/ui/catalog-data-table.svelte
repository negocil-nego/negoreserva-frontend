<script lang="ts">
  import type { OrgCatalogResponse } from "../data/model/catalog.model";
  import { OrgCatalogService } from "../data/service/catalog.service";
  import { useOrgGetCatalogFilterPaginate } from "../data/hooks/use-get-filter-paginate";
  import { renderComponent } from "$lib/components/ui/data-table/index.js";
  import { createOrgProductTable } from "../../product/ui/table/use-product-table.svelte.ts";
  import TableData from "$lib/components/table/table-data.svelte";
  import TableText from "$lib/components/table/table-text.svelte";
  import type { ColumnDef } from "@tanstack/table-core";
  import CatalogNameCell from "./catalog-name-cell.svelte";

  let service = new OrgCatalogService();

  let filter = $state({
    pageNumber: 0,
    pageSize: 100,
  });

  let baseQuery = $derived(
    useOrgGetCatalogFilterPaginate({ service, filter }),
  );

  let isLoading = $derived($baseQuery?.isLoading ?? false);
  let items = $derived($baseQuery?.data ?? { content: [] });

  const columns: ColumnDef<OrgCatalogResponse>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) =>
        renderComponent(CatalogNameCell, {
          name: row.original.name,
          imgUrl: row.original.imgUrl,
        }),
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) =>
        renderComponent(TableText, {
          text: row.original.description,
        }),
    },
  ];

  const tableState = $derived(
    createOrgProductTable({
      data: () => items?.content ?? [],
      columns,
    }),
  );

  const table = $derived(tableState.table);
</script>

<div class="w-full">
  <TableData
    {table}
    {columns}
    {isLoading}
    isEmpty={!items?.content?.length}
    title="Catálogos"
  />
</div>
