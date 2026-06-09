<script lang="ts">
  import type { ProductFileGetOrgResponse } from "$lib/feature/pub/organization/data/model/organization.model";

  let { files }: { files: ProductFileGetOrgResponse[] } = $props();

  let primary = $derived(files.find((f) => f.isPrimary) ?? files[0]);
</script>

<div
  class="flex flex-col gap-2 w-full bg-white dark:bg-gray-900/50 border border-gray-50 dark:border-gray-900 rounded-sm"
>
  <div class="relative aspect-square overflow-hidden m-auto p-2">
    {#if primary?.url}
      <img
        src={primary.url}
        alt={primary.title ?? ""}
        class="h-[200px] w-[200px] md:h-[300px] md:w-[300px] object-cover rounded-2xl"
      />
    {:else}
      <div
        class="flex h-full items-center justify-center text-muted-foreground"
      >
        Sem imagem
      </div>
    {/if}
  </div>
</div>
