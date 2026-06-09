<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ThreeDScaleIcon} from "@hugeicons/core-free-icons";
  import type {OrganizationDetailResponse} from "$lib/feature/pub/organization";
  import InfoRow from "$lib/components/info-row.svelte";
  import {
    PHOTO_SOCIAL_NETWORK_FACEBOOK,
    PHOTO_SOCIAL_NETWORK_INSTAGRAM,
    PHOTO_SOCIAL_NETWORK_LINKEDIN,
    PHOTO_SOCIAL_NETWORK_TIKTOK,
    PHOTO_SOCIAL_NETWORK_YOUTUBE
  } from "$lib/data/variables";

  let { data }: { data: OrganizationDetailResponse } = $props();

  const social = $derived(data.socialsMedia);
  const hasSocialMedia = $derived( social?.facebook || social?.instagram || social?.youtube || social?.tiKtok || social?.linkedin );
</script>

<section id="organization-section-social-media" class="mt-10 p-6 bg-panel border">
  <div class="flex items-center gap-2 mb-6">
    <HugeiconsIcon icon={ThreeDScaleIcon} size={24} color="currentColor" strokeWidth={1} />
    <h2 class="text-xl font-bold">Redes Sociais</h2>
  </div>

  {#if hasSocialMedia}
    <div class="space-y-3">
        {#if social?.facebook}
          <InfoRow label="Facebook" image={PHOTO_SOCIAL_NETWORK_FACEBOOK} value={social.facebook} type="redirect" isCopy/>
        {/if}
        {#if social?.instagram}
          <InfoRow label="Instagram" image={PHOTO_SOCIAL_NETWORK_INSTAGRAM} value={social.instagram} type="redirect" isCopy/>
        {/if}
        {#if social?.linkedin}
          <InfoRow label="LinkedIn" image={PHOTO_SOCIAL_NETWORK_LINKEDIN} value={social.linkedin} type="redirect" isCopy/>
        {/if}
        {#if social?.tiKtok}
          <InfoRow label="TikTok" image={PHOTO_SOCIAL_NETWORK_TIKTOK} value={social.tiKtok} type="redirect" isCopy/>
        {/if}
        {#if social?.youtube}
          <InfoRow label="Youtube" image={PHOTO_SOCIAL_NETWORK_YOUTUBE} value={social.youtube} type="redirect" isCopy/>
        {/if}
    </div>
  {:else}
    <p class="text-sm text-muted-foreground">Nenhuma rede social cadastrada.</p>
  {/if}
</section>
