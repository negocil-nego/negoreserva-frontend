<script lang="ts">
  import { Location03Icon, GlobeIcon, MapPinpoint01Icon } from "@hugeicons/core-free-icons";
  import type { OrgOrganizationProfile } from "../../data/model/organization";
  import ProfileInfoRow from "$lib/feature/shared/user/ui/profile-info-row.svelte";
  import { useOrgOrganizationUpdateAddress } from "../../data/hooks/use-org-organization-update-address";
  import { OrgOrganizationService } from "../../data/service/organization.service";

  let { data }: { data: OrgOrganizationProfile } = $props();

  const service = new OrgOrganizationService();

  let addressUpdateMutation = useOrgOrganizationUpdateAddress({ service });

  let isLoading = $derived($addressUpdateMutation.isLoading);

  const editAddress = async (value: string) => {
    if (isLoading) return;
    await $addressUpdateMutation.mutateAsync({ address: value });
  };
</script>

<div>
  <div class="px-4 sm:px-0 hidden">
    <h3 class="text-base/7 font-semibold text-foreground">Endereços</h3>
    <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">Endereços registados da organização.</p>
  </div>
  <div class="mt-6 border-t border-border">
    <dl class="divide-y divide-border">
      <ProfileInfoRow
        label="Endereço"
        icon={Location03Icon}
        subLabel="Endereço principal da organização."
        value={data.organization.address}
        onSubmit={editAddress}
        {isLoading}
      />
    </dl>

    {#if data.addresses && data.addresses.length > 0}
      <div class="mt-6 border-t border-border">
        <div class="px-4 sm:px-0 py-4">
          <h4 class="text-sm font-semibold text-foreground">Endereços Estruturados</h4>
        </div>
        {#each data.addresses as address}
          <div class="divide-y divide-border">
            <ProfileInfoRow
              label="País"
              icon={GlobeIcon}
              value={address.country}
            />
            <ProfileInfoRow
              label="Estado"
              icon={MapPinpoint01Icon}
              value={address.state}
            />
            <ProfileInfoRow
              label="Cidade"
              icon={MapPinpoint01Icon}
              value={address.city}
            />
            <ProfileInfoRow
              label="Bairro"
              icon={Location03Icon}
              value={address.neighborhood}
            />
            <ProfileInfoRow
              label="Rua"
              icon={Location03Icon}
              value={address.street}
            />
            <ProfileInfoRow
              label="Número"
              icon={Location03Icon}
              value={address.number}
            />
            <ProfileInfoRow
              label="Código Postal"
              icon={Location03Icon}
              value={address.zipCode}
            />
            <ProfileInfoRow
              label="Complemento"
              icon={Location03Icon}
              value={address.complement}
            />
          </div>
        {/each}
      </div>
    {:else}
      <div class="py-6 text-sm text-muted-foreground text-center">
        Nenhum endereço estruturado cadastrado.
      </div>
    {/if}
  </div>
</div>
