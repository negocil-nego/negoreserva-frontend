<script lang="ts">
  import { PersonService } from "../data/contract/person.service";
  import { PersonGqlRepo } from "../data/repository/person.gql.repo";
  import { useOrgGetPersonRoles } from "../data/hooks/use-get-person-roles";
  import { useOrgUpdatePerson } from "../data/hooks/use-org-update-person";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ShieldCheck, ShieldIcon, Cancel01Icon, AddCircleIcon, Search01Icon, SaveIcon } from "@hugeicons/core-free-icons";
  import type { OrgRoleItem } from "../data/model/person";

  let {
    open = $bindable(false),
    userUuid = "",
    userName = "",
    onSuccess,
  }: {
    open: boolean;
    userUuid: string;
    userName: string;
    onSuccess?: () => void;
  } = $props();

  const repo = new PersonGqlRepo();
  let service = new PersonService(repo);
  let updateMutation = useOrgUpdatePerson({ service });
  let selectedRoleUuids = $state<string[]>([]);
  let searchAssigned = $state("");
  let searchAvailable = $state("");
  let tab = $state("assigned");

  const query = $derived(
    useOrgGetPersonRoles({ service, userUuid, enabled: open && !!userUuid }),
  );
  const isLoading = $derived($query?.isLoading ?? false);

  $effect(() => {
    if (open && $query?.data) {
      selectedRoleUuids = $query.data.assignedRoles.map((r) => r.uuid);
      searchAssigned = "";
      searchAvailable = "";
      tab = "assigned";
    }
  });

  const availableRoles = $derived(
    (($query?.data?.availableRoles ?? []) as OrgRoleItem[])
      .filter((r) => !selectedRoleUuids.includes(r.uuid))
      .filter((r) =>
        searchAvailable
          ? r.name.toLowerCase().includes(searchAvailable.toLowerCase())
          : true,
      ),
  );

  const assignedRoles = $derived(
    (($query?.data?.assignedRoles ?? []) as OrgRoleItem[])
      .filter((r) => selectedRoleUuids.includes(r.uuid))
      .filter((r) =>
        searchAssigned
          ? r.name.toLowerCase().includes(searchAssigned.toLowerCase())
          : true,
      ),
  );

  function addRole(uuid: string) {
    selectedRoleUuids = [...selectedRoleUuids, uuid];
  }

  function removeRole(uuid: string) {
    selectedRoleUuids = selectedRoleUuids.filter((id) => id !== uuid);
  }

  async function handleSave() {
    try {
      await $updateMutation.mutateAsync({
        uuid: userUuid,
        request: { name: "", roleUuids: selectedRoleUuids },
      });
      open = false;
      onSuccess?.();
    } catch (err) {
      console.error("Erro ao salvar cargos:", err);
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-3xl">
    <Dialog.Header>
      <Dialog.Title class="flex items-center gap-2 text-xl">
        <HugeiconsIcon icon={ShieldCheck} size={24} color="currentColor" strokeWidth={1.5} />
        <span>Cargos — {userName}</span>
      </Dialog.Title>
      <Dialog.Description>
        Atribua ou remova cargos deste utilizador. As alterações são aplicadas ao clicar em "Guardar".
      </Dialog.Description>
    </Dialog.Header>

    {#if isLoading}
      <div class="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
        <HugeiconsIcon icon={ShieldIcon} size={32} color="currentColor" strokeWidth={1.5} />
        <span class="text-sm">A carregar cargos...</span>
      </div>
    {:else if assignedRoles.length === 0 && ($query?.data?.availableRoles ?? []).length === 0}
      <div class="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
        <HugeiconsIcon icon={ShieldIcon} size={32} color="currentColor" strokeWidth={1.5} />
        <span class="text-sm">Nenhum cargo disponivel</span>
      </div>
    {:else}
      <Tabs.Root bind:value={tab} class="w-full">
        <Tabs.List class="w-full">
          <Tabs.Trigger value="assigned" class="flex-1 gap-1.5">
            <HugeiconsIcon icon={ShieldCheck} size={16} color="currentColor" strokeWidth={1.5} />
            Atribuídos
            <Badge variant="default" class="ml-1 h-5 min-w-5 px-1.5 text-[11px]">
              {assignedRoles.length}
            </Badge>
          </Tabs.Trigger>
          <Tabs.Trigger value="available" class="flex-1 gap-1.5">
            <HugeiconsIcon icon={ShieldIcon} size={16} color="currentColor" strokeWidth={1.5} />
            Disponíveis
            <Badge variant="secondary" class="ml-1 h-5 min-w-5 px-1.5 text-[11px]">
              {availableRoles.length}
            </Badge>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="assigned" class="mt-3">
          <div class="relative mb-3">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <HugeiconsIcon icon={Search01Icon} size={16} color="currentColor" strokeWidth={1.5} />
            </span>
            <Input bind:value={searchAssigned} placeholder="Filtrar atribuídos..." class="pl-9" />
          </div>
          <div class="max-h-72 space-y-1 overflow-y-auto pr-1">
            {#each assignedRoles as role (role.uuid)}
              <div class="group flex items-center justify-between border border-green-200 bg-green-50/60 px-3 py-2.5 text-sm transition-colors hover:bg-green-100">
                <div class="flex min-w-0 flex-1 items-center gap-2">
                  <HugeiconsIcon icon={ShieldCheck} size={16} color="currentColor" strokeWidth={1.5} class="shrink-0 text-green-600" />
                  <span class="truncate font-medium">{role.name}</span>
                </div>
                <button
                  type="button"
                  class="ml-2 inline-flex shrink-0 cursor-pointer items-center gap-1 px-2 py-1 text-xs font-medium text-red-600 opacity-70 transition-opacity hover:bg-red-100 hover:opacity-100 group-hover:opacity-100 md:opacity-0"
                  onclick={() => removeRole(role.uuid)}
                  title="Remover cargo"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                  Remover
                </button>
              </div>
            {:else}
              <div class="flex flex-col items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
                <span>Nenhum cargo atribuído</span>
              </div>
            {/each}
          </div>
        </Tabs.Content>

        <Tabs.Content value="available" class="mt-3">
          <div class="relative mb-3">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <HugeiconsIcon icon={Search01Icon} size={16} color="currentColor" strokeWidth={1.5} />
            </span>
            <Input bind:value={searchAvailable} placeholder="Filtrar disponíveis..." class="pl-9" />
          </div>
          <div class="max-h-72 space-y-1 overflow-y-auto pr-1">
            {#each availableRoles as role (role.uuid)}
              <div class="group flex items-center justify-between border px-3 py-2.5 text-sm transition-colors hover:bg-muted/50">
                <div class="flex min-w-0 flex-1 items-center gap-2">
                  <HugeiconsIcon icon={ShieldIcon} size={16} color="currentColor" strokeWidth={1.5} class="shrink-0 text-muted-foreground" />
                  <span class="truncate">{role.name}</span>
                </div>
                <button
                  type="button"
                  class="ml-2 inline-flex shrink-0 cursor-pointer items-center gap-1 px-2 py-1 text-xs font-medium text-brand opacity-70 transition-opacity hover:bg-brand/10 hover:opacity-100 group-hover:opacity-100 md:opacity-0"
                  onclick={() => addRole(role.uuid)}
                  title="Adicionar cargo"
                >
                  <HugeiconsIcon icon={AddCircleIcon} size={16} color="currentColor" strokeWidth={1.5} />
                  Adicionar
                </button>
              </div>
            {:else}
              <div class="flex flex-col items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
                <span>Nenhum cargo disponivel</span>
              </div>
            {/each}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    {/if}

    <div class="mt-4 flex items-center justify-between border-t pt-4">
      <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
        <HugeiconsIcon icon={ShieldCheck} size={14} color="currentColor" strokeWidth={1.5} />
        <span>{assignedRoles.length} de {($query?.data?.assignedRoles ?? []).length + ($query?.data?.availableRoles ?? []).length} selecionados</span>
      </div>
      <div class="flex items-center gap-2">
        <Dialog.Close
          type="button"
          class="inline-flex cursor-pointer items-center justify-center px-4 py-2 text-sm font-medium border hover:bg-muted transition-colors"
        >
          Cancelar
        </Dialog.Close>
        <Button
          class="bg-brand cursor-pointer gap-1.5"
          type="button"
          disabled={isLoading || $updateMutation.isLoading}
          onclick={handleSave}
        >
          <HugeiconsIcon icon={SaveIcon} size={16} color="currentColor" strokeWidth={1.5} />
          {$updateMutation.isLoading ? "A guardar..." : "Guardar"}
        </Button>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>