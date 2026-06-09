<script lang="ts">
    import type {OrganizationResponse} from "$lib/feature/pub/organization";
    import {organizationSelectedStore} from "$lib/stores/organization.store";
    import {OrganizationManage} from "$lib/feature/pub/organization/data/service/organization.service";
    import {Popover} from "$lib/components/ui/popover";
    import {Button} from "$lib/components/ui/button";
    import {HugeiconsIcon} from '@hugeicons/svelte';
    import {PlusSignIcon} from '@hugeicons/core-free-icons';
    import {Checkbox} from "$lib/components/ui/checkbox";
    import {Search01Icon} from "@hugeicons/core-free-icons";

    const service = new OrganizationManage();

    let search = $state("");
    let organizations = $state<OrganizationResponse[]>([]);
    let isLoading = $state(false);

    const selects = $derived($organizationSelectedStore);

    const isSelected = (org: OrganizationResponse): boolean => {
        return selects.some((o) => o.uuid === org.uuid);
    };

    function toggleOrganization(org: OrganizationResponse) {
        organizationSelectedStore.toggle(org);
    }

    async function loadOrganizations() {
        isLoading = true;
        try {
            const result = await service.searchFilter(
                {q: search || null, categoriesUuid: []},
                {pageNumber: 0, pageSize: 50}
            );
            organizations = result?.content ?? [];
        } catch {
            organizations = [];
        } finally {
            isLoading = false;
        }
    }

    $effect(() => {
        search;
        loadOrganizations();
    });
</script>

<div class="space-y-2">
    <Popover.Root>
        <Popover.Trigger class="w-full">
            <Button type="button" variant="outline" class="w-full justify-start gap-2 text-sm font-normal">
                <HugeiconsIcon
                        icon={PlusSignIcon}
                        size={24}
                        color="currentColor"
                        strokeWidth={1.5}
                />
                {selects.length > 0 ? `${selects.length} selecionada(s)` : "Selecionar"}
            </Button>
        </Popover.Trigger>
        <Popover.Content class="w-80 md:w-96 p-3 bg-background z-30">
            <div class="relative mb-2">
                <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <HugeiconsIcon icon={Search01Icon} size={16} class="text-muted-foreground" />
                </div>
                <input
                        type="text"
                        placeholder="Pesquisar organizações..."
                        class="w-full pl-9 pr-3 py-2 text-sm bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        bind:value={search}
                />
            </div>

            <div class="max-h-60 overflow-y-auto space-y-0.5">
                {#if isLoading}
                    <p class="text-sm text-muted-foreground p-2">Carregando...</p>
                {:else if organizations.length === 0}
                    <p class="text-sm text-muted-foreground p-2">Nenhuma organização encontrada</p>
                {:else}
                    {#each organizations as org (org.uuid)}
                        <button
                                type="button"
                                class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted cursor-pointer"
                                onclick={() => toggleOrganization(org)}
                        >
                            <Checkbox checked={isSelected(org)} class="pointer-events-none"/>
                            {#if org.logo}
                                <img src={org.logo} alt={org.name} class="size-5 rounded object-cover bg-muted shrink-0"/>
                            {:else}
                                <span class="size-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-green-700 shrink-0">
                                    {org.name.charAt(0)}
                                </span>
                            {/if}
                            <span class="truncate">{org.name}</span>
                        </button>
                    {/each}
                {/if}
            </div>
        </Popover.Content>
    </Popover.Root>
</div>
