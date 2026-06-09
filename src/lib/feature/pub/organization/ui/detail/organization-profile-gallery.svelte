<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Image01Icon } from "@hugeicons/core-free-icons";
  import type {OrganizationDetailResponse} from "$lib/feature/pub/organization";

  let { data }: { data: OrganizationDetailResponse } = $props();
</script>

<section id="organization-section-gallery" class="mt-10 bg-panel p-6 border">
  <div class="flex items-center gap-2 mb-6">
    <HugeiconsIcon icon={Image01Icon} size={24} color="currentColor" strokeWidth={1} />
    <h2 class="text-xl font-bold">Galeria</h2>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#if data.logo}
      <div class="rounded-lg border border-border overflow-hidden">
        <img
          src={data.logo}
          alt="Logo"
          class="w-full h-48 object-contain p-4 bg-white"
        />
        <div class="p-2 text-xs text-muted-foreground bg-muted">Logo</div>
      </div>
    {/if}

    {#if data.image}
      <div class="rounded-lg border border-border overflow-hidden">
        <img
          src={data.image}
          alt="Banner"
          class="w-full h-48 object-cover"
        />
        <div class="p-2 text-xs text-muted-foreground bg-muted">Imagem de Capa</div>
      </div>
    {/if}

    {#if data.video}
      <div class="rounded-lg border border-border overflow-hidden">
        <video
          src={data.video}
          controls
          class="w-full h-48 object-cover"
        />
        <div class="p-2 text-xs text-muted-foreground bg-muted">Vídeo</div>
      </div>
    {/if}
  </div>

  {#if !data.logo && !data.image && !data.video}
    <div class="flex flex-col items-center gap-2 py-8 text-muted-foreground">
      <HugeiconsIcon icon={Image01Icon} size={32} color="currentColor" strokeWidth={1} />
      <p class="text-sm">Nenhum conteúdo multimédia disponível.</p>
    </div>
  {/if}
</section>
