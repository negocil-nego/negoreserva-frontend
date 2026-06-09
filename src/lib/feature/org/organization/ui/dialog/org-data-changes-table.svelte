<script lang="ts">
  import { OrgOrganizationUpdateDataService } from "../../data/service/organization-update-data.service";
  import { useOrgUpdateDataFindAll } from "../../data/hooks/use-org-update-data-find-all";

  const service = new OrgOrganizationUpdateDataService();
  const query = useOrgUpdateDataFindAll({ service });
  let data = $derived($query.data ?? []);
  let isLoading = $derived($query.isLoading);
</script>

<div class="px-4 py-6">
  <h3 class="text-base/7 font-semibold text-foreground mb-4">
    Alterações de Dados
  </h3>
  {#if isLoading}
    <p class="text-sm text-muted-foreground">A carregar...</p>
  {:else if data.length === 0}
    <p class="text-sm text-muted-foreground">Nenhuma alteração encontrada.</p>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-2 px-3 font-medium">ID</th>
            <th class="text-left py-2 px-3 font-medium">Input</th>
            <th class="text-left py-2 px-3 font-medium">Tipo</th>
            <th class="text-left py-2 px-3 font-medium">Expira em</th>
          </tr>
        </thead>
        <tbody>
          {#each data as item}
            <tr class="border-b border-border hover:bg-muted/50">
              <td class="py-2 px-3">{item.id}</td>
              <td class="py-2 px-3">{item.input ?? "-"}</td>
              <td class="py-2 px-3">{item.type ?? "-"}</td>
              <td class="py-2 px-3">{item.expiredAt ?? "-"}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
