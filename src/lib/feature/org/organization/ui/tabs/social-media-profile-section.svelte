<script lang="ts">
  import { Link01Icon } from "@hugeicons/core-free-icons";
  import type { OrgOrganizationProfile, OrganizationSocialMediaEditRequest } from "../../data/model/organization";
  import ProfileInfoRow from "$lib/feature/shared/user/ui/profile-info-row.svelte";
  import { useOrgOrganizationUpdateSocialMedia } from "../../data/hooks/use-org-organization-update-social-media";
  import { OrgOrganizationService } from "../../data/service/organization.service";

  let { data }: { data: OrgOrganizationProfile } = $props();

  const service = new OrgOrganizationService();

  let socialMediaUpdateMutation = useOrgOrganizationUpdateSocialMedia({ service });

  let isLoading = $derived($socialMediaUpdateMutation.isLoading);

  const social = $derived(data.socialMedia);

  const editSocialMedia = async (field: string, value: string) => {
    if (isLoading) return;
    const request: OrganizationSocialMediaEditRequest = {
      facebook: social?.facebook ?? undefined,
      instagram: social?.instagram ?? undefined,
      youtube: social?.youtube ?? undefined,
      tiktok: social?.tiKtok ?? undefined,
      linkedin: social?.linkedin ?? undefined,
    };
    request[field] = value;
    await $socialMediaUpdateMutation.mutateAsync(request);
  };
</script>

<div>
  <div class="px-4 sm:px-0 hidden">
    <h3 class="text-base/7 font-semibold text-foreground">Redes Sociais</h3>
    <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">Links para as redes sociais da organização.</p>
  </div>
  <div class="mt-6 border-t border-border">
    <dl class="divide-y divide-border">
      <ProfileInfoRow
        label="Facebook"
        icon={Link01Icon}
        value={social?.facebook}
        onSubmit={(value) => editSocialMedia("facebook", value)}
        {isLoading}
      />
      <ProfileInfoRow
        label="Instagram"
        icon={Link01Icon}
        value={social?.instagram}
        onSubmit={(value) => editSocialMedia("instagram", value)}
        {isLoading}
      />
      <ProfileInfoRow
        label="Youtube"
        icon={Link01Icon}
        value={social?.youtube}
        onSubmit={(value) => editSocialMedia("youtube", value)}
        {isLoading}
      />
      <ProfileInfoRow
        label="TikTok"
        icon={Link01Icon}
        value={social?.tiKtok}
        onSubmit={(value) => editSocialMedia("tiktok", value)}
        {isLoading}
      />
      <ProfileInfoRow
        label="LinkedIn"
        icon={Link01Icon}
        value={social?.linkedin}
        onSubmit={(value) => editSocialMedia("linkedin", value)}
        {isLoading}
      />
    </dl>
  </div>
</div>
