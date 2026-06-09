<script lang="ts">
    import type {
        CategoryFilterQueryParamInput,
        CategoryResponse
    } from "$lib/feature/shared/category/model/category.model";
    import {usePubGetCategoryFilterPaginate} from "$lib/feature/pub/category/data/hooks/use-get-filter-paginate";
    import {CategoryManage} from "$lib/feature/pub/category/data/service/category.service";
    import {registerCategoryStore} from "$lib/stores/register.store";
    import {Popover} from "$lib/components/ui/popover";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import {Badge} from "$lib/components/ui/badge";
    import {Button} from "$lib/components/ui/button";
    import {HugeiconsIcon} from '@hugeicons/svelte';
    import {PlusSignIcon, Cancel01Icon} from '@hugeicons/core-free-icons';
    import {Checkbox} from "$lib/components/ui/checkbox";

    const service = new CategoryManage();

    const filter: CategoryFilterQueryParamInput = {
        field: "ALL",
        search: "",
        pageNumber: 0,
        pageSize: 100,
    };

    const query = usePubGetCategoryFilterPaginate({service, filter});
    const categories = $derived($query.data?.content ?? []);
    const isLoading = $derived($query.isLoading);
    const selects = $derived($registerCategoryStore);

    const isSelected = (category: CategoryResponse): boolean => {
        return selects.some((c) => c.uuid === category.uuid);
    };

    function toggleCategory(category: CategoryResponse) {
        registerCategoryStore.toggle(category);
    }
</script>

<div class="space-y-2">
    <div class="text-sm font-medium">Categorias</div>

    {#if selects.length > 0}
        <div class="flex flex-wrap gap-1.5">
            {#each selects as cat (cat.uuid)}
                <Badge variant="secondary" class="gap-1 pr-1">
                    <i class={cat.icon ?? "hgi hgi-stroke hgi-access"}></i>
                    <span class="text-xs">{cat.name}</span>
                    <button
                            type="button"
                            class="cursor-pointer hover:text-destructive"
                            onclick={() => toggleCategory(cat)}
                    >
                        <HugeiconsIcon
                                icon={Cancel01Icon}
                                size={24}
                                color="currentColor"
                                strokeWidth={1.5}
                        />
                    </button>
                </Badge>
            {/each}
        </div>
    {/if}

    <Popover.Root>
        <Popover.Trigger class="w-full">
            <Button type="button" variant="outline" class="w-full justify-start gap-2 text-sm font-normal">
                <HugeiconsIcon
                        icon={PlusSignIcon}
                        size={24}
                        color="currentColor"
                        strokeWidth={1.5}
                />
                {selects.length > 0 ? "Adicionar/Remover" : "Selecionar"}
            </Button>
        </Popover.Trigger>
        <Popover.Content class="w-80 md:w-96 p-0 bg-background">
            <Tabs.Root value="lista" class="w-full">
                <Tabs.List class="mx-3 mt-2">
                    <Tabs.Trigger value="lista" class="flex-1">Lista</Tabs.Trigger>
                    <Tabs.Trigger value="selecionados" class="flex-1">
                        Selecionados
                        {#if selects.length > 0}
                            <Badge variant="default" class="ml-1 h-4 min-w-4 px-1 text-[10px]">{selects.length}</Badge>
                        {/if}
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="lista" class="mt-0 max-h-60 overflow-y-auto p-2">
                    {#if isLoading}
                        <p class="text-sm text-muted-foreground p-2">Carregando...</p>
                    {:else if categories.length === 0}
                        <p class="text-sm text-muted-foreground p-2">Nenhuma categoria encontrada</p>
                    {:else}
                        {#each categories as cat (cat.uuid)}
                            <button
                                    type="button"
                                    class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted cursor-pointer"
                                    onclick={() => toggleCategory(cat)}
                            >
                                <Checkbox checked={isSelected(cat)} class="pointer-events-none"/>
                                <i class={cat.icon ?? "hgi hgi-stroke hgi-access"}></i>
                                <span>{cat.name}</span>
                            </button>
                        {/each}
                    {/if}
                </Tabs.Content>

                <Tabs.Content value="selecionados" class="mt-0 max-h-60 overflow-y-auto p-2">
                    {#if selects.length === 0}
                        <p class="text-sm text-muted-foreground p-2">Nenhuma categoria selecionada</p>
                    {:else}
                        {#each selects as cat (cat.uuid)}
                            <div class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm">
                                <i class={cat.icon ?? "hgi hgi-stroke hgi-access"}></i>
                                <span class="flex-1">{cat.name}</span>
                                <button
                                        type="button"
                                        class="cursor-pointer text-muted-foreground hover:text-destructive"
                                        onclick={() => toggleCategory(cat)}
                                >
                                  <HugeiconsIcon
                                          icon={Cancel01Icon}
                                          size={24}
                                          color="currentColor"
                                          strokeWidth={1.5}
                                  />
                                </button>
                            </div>
                        {/each}
                    {/if}
                </Tabs.Content>
            </Tabs.Root>
        </Popover.Content>
    </Popover.Root>
</div>
