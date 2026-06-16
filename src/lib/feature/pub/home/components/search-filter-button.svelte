<script lang="ts">
    import LocationSelector from "$lib/feature/pub/location/ui/location-selector.svelte";
    import { SEARCH_ALL, searchItems, searchMap } from "../types.svelte";
    import { FilterHorizontalIcon } from "@hugeicons/core-free-icons";
    import { buttonVariants } from "$lib/components/ui/button/index";
    import { Label } from "$lib/components/ui/label/index";
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import * as Select from "$lib/components/ui/select/index";
    import * as Checkbox from "$lib/components/ui/checkbox";
    import * as Popover from "$lib/components/ui/popover";
    import { searchFilterStore } from "$lib/stores/search-filter.store";

    let search = $state(SEARCH_ALL);
    let provinceValue = $state($searchFilterStore.province);
    let municipalityValue = $state($searchFilterStore.municipality);
    let isHighlight = $state($searchFilterStore.isHighlight);

    $effect(() => {
        searchFilterStore.setFilter({ province: provinceValue });
    });

    $effect(() => {
        searchFilterStore.setFilter({ municipality: municipalityValue });
    });

    function handleHighlightChange() {
        isHighlight = !isHighlight;
        searchFilterStore.setFilter({ isHighlight });
    }

    function handleSearchType(v: string) {
        const item = searchMap[v];
        if (item) {
            search = item;
            searchFilterStore.setFilter({ searchType: item.value });
        }
    }
</script>

<Popover.Root>
    <Popover.Trigger class={buttonVariants({ variant: "outline", class: "flex items-center gap-2 bg-brand rounded-full hover:text-white" })}>
        <HugeiconsIcon icon={FilterHorizontalIcon} size={16} />
        <span class="hidden md:block">Filtro</span>
    </Popover.Trigger>

    <Popover.Content class="w-80">
        <div class="grid gap-4">
            <div class="space-y-2">
                <h4 class="font-medium leading-none">Filtros de Localização</h4>
            </div>

            <div class="grid grid-cols-3 items-center gap-4">
                <Label for="grupo">Grupo</Label>
                <div class="col-span-2">
                    <Select.Root type="single" value={search.value} onValueChange={handleSearchType}>
                        <Select.Trigger id="grupo" class="w-full border">{search.name}</Select.Trigger>
                        <Select.Content>
                            {#each searchItems as item (item.value)}
                                <Select.Item value={item.value} label={item.name}>{item.name}</Select.Item>
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </div>
            </div>

            <LocationSelector
                varient='filter'
                bind:provinceValue
                bind:municipalityValue
            />

            <div class="grid grid-cols-3 items-center gap-4">
                <Label for="destaque" class="cursor-pointer">Em Destaque</Label>
                <Checkbox.Root
                    id="destaque"
                    checked={isHighlight}
                    onCheckedChange={handleHighlightChange}
                    class="col-span-2 border-white align-bottom"
                />
            </div>
        </div>
    </Popover.Content>
</Popover.Root>
