<script lang="ts">
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import { Search01Icon } from "@hugeicons/core-free-icons";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Separator } from "$lib/components/ui/separator/index";
    import SearchFilterButton from "./components/search-filter-button.svelte";
    import { searchFilterStore } from "$lib/stores/search-filter.store";

    let q = $state($searchFilterStore.q);

    $effect(() => {
        if (!$searchFilterStore.isSearching) {
            q = $searchFilterStore.q;
        }
    });

    function handleSearch() {
        searchFilterStore.setFilter({ q, isSearching: true });
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") handleSearch();
    }
</script>

<div class="container relative mt-10">
    <div
        class="absolute -top-5 left-0 right-0 mx-auto w-full z-10 shadow border bg-white dark:border-gray-800 dark:bg-slate-950/30 rounded-md m-auto"
    >
        <div
            class="flex items-center gap-2 dark:bg-slate-950/30 py-1 px-2 w-full md:min-h-15"
        >
            <div class="items-center gap-2 hidden md:flex text-slate-500">
                <HugeiconsIcon
                    icon={Search01Icon}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                />
            </div>
            <input
                type="text"
                bind:value={q}
                onkeydown={handleKeydown}
                class="text-black text-sm w-full bg-transparent placeholder-slate-400 border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                placeholder="Pesquisa Hotel, hospedaria, restaurantes, etc..."
            />
            <div class="flex gap-1">
                <SearchFilterButton />
                <Separator class="bg-gray-800 w-full" orientation="vertical" />
                <Button
                    onclick={handleSearch}
                    class="flex justify-center items-center cursor-pointer bg-brand rounded-full"
                    variant="outline"
                >
                    <HugeiconsIcon
                        icon={Search01Icon}
                        size={16}
                        color="currentColor"
                        strokeWidth={2}
                    />
                    <span class="hidden md:block">Pesquisar</span>
                </Button>
            </div>
        </div>
    </div>
</div>
