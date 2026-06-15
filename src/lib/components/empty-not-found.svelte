<script lang="ts">
  import * as Empty from "$lib/components/ui/empty/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ReloadIcon, Search01Icon } from "@hugeicons/core-free-icons";
</script>

<Empty.Root class="flex flex-col items-center justify-center p-6 text-center border-dashed bg-panel container">
  <Empty.Header>
    <Empty.Media variant="icon">
      <HugeiconsIcon icon={Search01Icon} size={24} />
    </Empty.Media>
    <Empty.Title>Nenhum registro encontrado</Empty.Title>
    <Empty.Description>
      Não foi possível localizar dados para esta consulta.
    </Empty.Description>
  </Empty.Header>

  <Empty.Content>
    <Button variant="outline" size="sm" onclick={() => window.location.reload()}>
      <HugeiconsIcon icon={ReloadIcon} size={16} class="mr-2" />
      Recarregar
    </Button>
  </Empty.Content>
</Empty.Root>