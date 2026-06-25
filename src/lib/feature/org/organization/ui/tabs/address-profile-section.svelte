<script lang="ts">
  import {
    Location03Icon,
    MapPinpoint01Icon,
    GlobeIcon,
    PlusSignIcon,
    Delete01Icon,
    CheckmarkCircle01Icon,
  } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import type { OrgOrganizationProfile } from "../../data/model/organization";
  import { useOrgOrganizationUpsertAddress } from "../../data/hooks/use-org-organization-upsert-address";
  import { useOrgOrganizationSetDefaultAddress } from "../../data/hooks/use-org-organization-set-default-address";
  import { useOrgOrganizationRemoveAddress } from "../../data/hooks/use-org-organization-remove-address";
  import { useOrgOrganizationUpdate } from "../../data/hooks/use-org-organization-update";
  import { OrgOrganizationService } from "../../data/service/organization.service";
  import LocationSelector from "$lib/feature/pub/location/ui/location-selector.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import ProfileInfoRow from "$lib/feature/shared/user/ui/profile-info-row.svelte";

  let { data }: { data: OrgOrganizationProfile } = $props();

  const service = new OrgOrganizationService();

  let upsertMutation = useOrgOrganizationUpsertAddress({ service });
  let setDefaultMutation = useOrgOrganizationSetDefaultAddress({ service });
  let removeMutation = useOrgOrganizationRemoveAddress({ service });
  let orgUpdateMutation = useOrgOrganizationUpdate({ service });

  let isLoading = $derived(
    $upsertMutation.isLoading ||
      $setDefaultMutation.isLoading ||
      $removeMutation.isLoading,
  );

  let showAddForm = $state(false);
  let newProvinceValue = $state("");
  let newMunicipalityValue = $state("");
  let newProvinceUuid = $state("");
  let newMunicipalityUuid = $state("");
  let newComplement = $state("");

  const canAdd = $derived(
    !!(newComplement.length > 0 && newProvinceUuid && newMunicipalityUuid),
  );

  const handleAddAddress = async () => {
    if (!canAdd || isLoading) return;
    await $upsertMutation.mutateAsync({
      complement: newComplement || null,
      provinceUuid: newProvinceUuid,
      municipalityUuid: newMunicipalityUuid,
    });
    newProvinceValue = "";
    newMunicipalityValue = "";
    newProvinceUuid = "";
    newMunicipalityUuid = "";
    newComplement = "";
    showAddForm = false;
  };

  const handleSetDefault = async (uuid: string) => {
    if (isLoading) return;
    await $setDefaultMutation.mutateAsync(uuid);
  };

  const handleRemove = async (uuid: string) => {
    if (isLoading) return;
    await $removeMutation.mutateAsync(uuid);
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
    <h3 class="text-base/7 font-semibold text-foreground">Endereços</h3>
    <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">
      Endereços registados da organização.
    </p>
  </div>
  <div class="mt-6 border-t border-border">
    <div class="px-5 md:px-10">
      <ProfileInfoRow
        label="Endereço"
        icon={Location03Icon}
        value={data.organization.address}
        onSubmit={editOrgAddress}
        {isLoading}
      />
    </div>
    {#if data.addresses && data.addresses.length > 0}
      <div class="mt-6 border-t border-border">
        <div class="px-4 sm:px-0 py-4 flex items-center justify-between">
          <div>
            <h4 class="text-sm font-semibold text-foreground">
              Endereços Estruturados
            </h4>
            <p class="text-xs text-muted-foreground">
              Apenas um endereço pode ser o principal.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onclick={() => (showAddForm = !showAddForm)}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            <span class="ml-1">Adicionar</span>
          </Button>
        </div>

        {#if showAddForm}
          <div class="border border-border p-4 mb-4 space-y-3">
            <LocationSelector
              bind:provinceValue={newProvinceValue}
              bind:municipalityValue={newMunicipalityValue}
              bind:provinceUuid={newProvinceUuid}
              bind:municipalityUuid={newMunicipalityUuid}
              variant="register"
            />
            <div>
              <label
                for="complement"
                class="text-sm font-medium text-foreground">Endereço</label
              >
              <input
                id="complement"
                type="text"
                bind:value={newComplement}
                placeholder="Apto, sala, etc."
                class="mt-1 flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div class="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onclick={() => (showAddForm = false)}>Cancelar</Button
              >
              <Button size="sm" disabled={!canAdd} onclick={handleAddAddress}
                >Salvar</Button
              >
            </div>
          </div>
        {/if}

        {#each data.addresses as address (address.uuid)}
          <div
            class="divide-y divide-border border border-border mb-3 p-3 {address.isDefault
              ? 'ring-2 ring-brand/30'
              : ''}"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                {#if address.isDefault}
                  <span
                    class="inline-flex items-center gap-1 text-xs font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-full"
                  >
                    <HugeiconsIcon icon={CheckmarkCircle01Icon} size={12} />
                    Principal
                  </span>
                {/if}
              </div>
              <div class="flex gap-1">
                {#if !address.isDefault}
                  <Button
                    variant="ghost"
                    size="sm"
                    onclick={() => handleSetDefault(address.uuid)}
                    disabled={isLoading}
                    title="Definir como principal"
                  >
                    <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} />
                  </Button>
                {/if}
                <Button
                  variant="ghost"
                  size="sm"
                  onclick={() => handleRemove(address.uuid)}
                  disabled={isLoading}
                  title="Remover"
                >
                  <HugeiconsIcon
                    icon={Delete01Icon}
                    size={16}
                    class="text-red-500"
                  />
                </Button>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
              <div class="flex items-center gap-2 text-muted-foreground">
                <HugeiconsIcon icon={GlobeIcon} size={14} />
                <span>{address.province?.label ?? "-"}</span>
              </div>
              <div class="flex items-center gap-2 text-muted-foreground">
                <HugeiconsIcon icon={MapPinpoint01Icon} size={14} />
                <span>{address.municipality?.label ?? "-"}</span>
              </div>
              {#if address.complement}
                <div
                  class="flex items-center gap-2 text-muted-foreground md:col-span-2"
                >
                  <HugeiconsIcon icon={Location03Icon} size={14} />
                  <span>{address.complement}</span>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="py-6 text-sm text-muted-foreground text-center">
        Nenhum endereço estruturado cadastrado.
        <Button variant="link" size="sm" onclick={() => (showAddForm = true)}
          >Adicionar endereço</Button
        >
      </div>
      {#if showAddForm}
        <div class="border border-border p-4 mb-4 space-y-3 mx-4">
          <LocationSelector
            bind:provinceValue={newProvinceValue}
            bind:municipalityValue={newMunicipalityValue}
            bind:provinceUuid={newProvinceUuid}
            bind:municipalityUuid={newMunicipalityUuid}
            variant="register"
          />
          <div>
            <label for="complement" class="text-sm font-medium text-foreground"
              >Endereço</label
            >
            <input
              id="complement"
              type="text"
              bind:value={newComplement}
              placeholder="Apto, sala, etc."
              class="mt-1 flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div class="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onclick={() => (showAddForm = false)}
            >
              Cancelar
            </Button>
            <Button
              class="bg-brand"
              size="sm"
              disabled={!canAdd}
              onclick={handleAddAddress}
            >
              Salvar
            </Button>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>
