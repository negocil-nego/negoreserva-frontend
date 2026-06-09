<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    Mail01Icon,
    Call02Icon,
    City02Icon,
    StarIcon,
    InformationSquareIcon,
    Message01FreeIcons
  } from "@hugeicons/core-free-icons";
  import GetOrganizationCategoryCarousel from "../get-organization-category-carousel.svelte";
  import type {OrganizationDetailResponse} from "$lib/feature/pub/organization";
  import InfoRow from "$lib/components/info-row.svelte";
  import PanelInfoRow from "$lib/components/panel-info-row.svelte";

  let { data }: { data: OrganizationDetailResponse } = $props();
</script>

<section id="organization-section-info" class="mt-10 bg-panel p-6 md:mt-20 border">
  <div class="flex items-center gap-2 mb-6">
    <HugeiconsIcon icon={InformationSquareIcon} size={24} color="currentColor" strokeWidth={1} />
    <h2 class="text-xl font-bold">Sobre a Organização</h2>
  </div>

  <div class="space-y-4">
    <InfoRow label="Descrição" icon={Message01FreeIcons} value={data.description ?? '-'} isCopy/>
    <InfoRow label="Nome" icon={City02Icon} value={data.name} isCopy/>
    <InfoRow label="Email" icon={Mail01Icon} value={data.email} isCopy/>
    <InfoRow label="Telefone" icon={Call02Icon} value={data.phone} isCopy/>

    {#if data.rating}
      <InfoRow label="Estrela" icon={StarIcon} value={data.rating} />
    {/if}

    {#if data.categories && data.categories.length > 0}
      <PanelInfoRow label="Categorias" icon={InformationSquareIcon}>
        <GetOrganizationCategoryCarousel categories={data.categories} />
      </PanelInfoRow>
    {/if}
  </div>
</section>
