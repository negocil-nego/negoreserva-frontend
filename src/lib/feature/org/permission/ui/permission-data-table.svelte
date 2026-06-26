<script lang="ts">
  import type { PermissionResponse } from "$lib/feature/shared/permission/data/model";
  import { OrgPermissionService } from "../data/service/permission.service";
  import { useOrgGetPermission } from "../data/hooks/use-get-all";
  import { createOrgProductTable } from "../../product/ui/table/use-product-table.svelte.ts";
  import TableData from "$lib/components/table/table-data.svelte";
  import type { ColumnDef } from "@tanstack/table-core";

  let service = new OrgPermissionService();

  const query = $derived(
    useOrgGetPermission({ service }),
  );

  const isLoading = $derived($query?.isLoading ?? false);
  const permissions = $derived<PermissionResponse[]>($query?.data ?? []);

  const columns: ColumnDef<PermissionResponse>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => row.original.description ?? "",
    },
  ];

  const tableState = $derived(
    createOrgProductTable({
      data: () => permissions,
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
    isEmpty={!permissions.length}
    title="Permissões"
  />
</div>
