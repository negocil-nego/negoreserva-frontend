<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {Location01Icon, GlobeIcon, MapPinpoint01Icon, City02Icon} from "@hugeicons/core-free-icons";
  import type {OrganizationDetailResponse} from "$lib/feature/pub/organization";
  import InfoRow from "$lib/components/info-row.svelte";

  let { data }: { data: OrganizationDetailResponse } = $props();
</script>

<section id="organization-section-address" class="bg-panel p-6 border relative w-full">
  <div class="flex items-center gap-2 mb-6">
    <HugeiconsIcon icon={Location01Icon} size={24} color="currentColor" strokeWidth={1} />
    <h2 class="text-xl font-bold">Endereço</h2>
  </div>

  {#if data.addresses && data.addresses.length > 0}
    <div class="space-y-4">
      <h3 class="text-sm font-semibold text-muted-foreground">Endereços Estruturados</h3>
      {#each data.addresses as address (address.uuid)}
        <div class="rounded-lg border border-border p-4 space-y-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <InfoRow label="Província" icon={MapPinpoint01Icon} value={address.province.label} />
            <InfoRow label="Município" icon={City02Icon} value={address.municipality.label} />
            {#if address.complement}
              <InfoRow label="Complemento" icon={Location01Icon} value={address.complement} />
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else if !data.address}
    <p class="text-sm text-muted-foreground">Nenhum endereço cadastrado.</p>
  {/if}
</section>
