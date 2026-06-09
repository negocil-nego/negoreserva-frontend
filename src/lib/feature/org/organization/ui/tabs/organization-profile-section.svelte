<script lang="ts">
  import {
    City01Icon,
    Location03Icon,
    Message01Icon,
  } from "@hugeicons/core-free-icons";
  import type { OrgOrganizationProfile } from "../../data/model/organization";
  import ProfileInfoRow from "$lib/feature/shared/user/ui/profile-info-row.svelte";
  import { useOrgOrganizationUpdate } from "../../data/hooks/use-org-organization-update";
  import { OrgOrganizationService } from "../../data/service/organization.service";
  import OrgOrganizationEmailDialog from "../dialog/org-organization-email-dialog.svelte";
  import OrgOrganizationPhoneDialog from "../dialog/org-organization-phone-dialog.svelte";

  let { data }: { data: OrgOrganizationProfile } = $props();

  const service = new OrgOrganizationService();

  let orgUpdateMutation = useOrgOrganizationUpdate({
    service,
  });

  let isLoading = $derived($orgUpdateMutation.isLoading);

  const editOrgName = async (value: string) => {
    if (isLoading) return;
    await $orgUpdateMutation.mutateAsync({
      name: value,
      description: data.organization.description ?? "",
      address: data.organization.address ?? "",
    });
  };

  const editOrgDescription = async (value: string) => {
    if (isLoading) return;
    await $orgUpdateMutation.mutateAsync({
      name: data.organization.name,
      description: value,
      address: data.organization.address ?? "",
    });
  };

  const editOrgAddress = async (value: string) => {
    if (isLoading) return;
    await $orgUpdateMutation.mutateAsync({
      name: data.organization.name,
      description: data.organization.description ?? "",
      address: value,
    });
  };
</script>

<div>
  <div class="px-4 sm:px-0 hidden">
    <h3 class="text-base/7 font-semibold text-foreground">
      Informações da Organização
    </h3>
    <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">
      Dados da organização.
    </p>
  </div>
  <div class="mt-6 border-t border-border">
    <dl class="divide-y divide-border">
      <ProfileInfoRow
        label="Nome"
        icon={City01Icon}
        subLabel="Nome da organização."
        value={data.organization.name}
        onSubmit={editOrgName}
        {isLoading}
      />
      <OrgOrganizationEmailDialog value={data} />
      <OrgOrganizationPhoneDialog value={data} />
      <ProfileInfoRow
        label="Descrição"
        icon={Message01Icon}
        value={data.organization.description}
        type="textarea"
        onSubmit={editOrgDescription}
        {isLoading}
      />
      <ProfileInfoRow
        label="Endereço"
        icon={Location03Icon}
        value={data.organization.address}
        onSubmit={editOrgAddress}
        {isLoading}
      />
    </dl>
  </div>
</div>
