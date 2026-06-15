<script lang="ts">
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import {
        FilterHorizontalIcon,
        Search01Icon,
    } from "@hugeicons/core-free-icons";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Separator } from "$lib/components/ui/separator/index";
    import * as Select from "$lib/components/ui/select/index";
    import { SEARCH_ALL, searchItems, searchMap } from "./types.svelte";

    let search = $state(SEARCH_ALL);
</script>

<div class="container relative">
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
                class="text-black text-sm w-full bg-transparent placeholder-slate-400 border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                placeholder="Pesquisa Hotel, hospedaria, restaurantes, etc..."
            />
            <div class="flex gap-1">
                <Button
                    class="flex justify-center items-center cursor-pointer bg-brand rounded-full"
                    variant="outline"
                >
                    <HugeiconsIcon
                        icon={FilterHorizontalIcon}
                        size={16}
                        color="currentColor"
                        strokeWidth={2}
                    />
                    <span class="hidden md:block">Filtro</span>
                </Button>
                <Separator class="bg-gray-800 w-full" orientation="vertical" />
                <Button
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
            <div class="hidden">
                <Select.Root type="single" value={search.value} onValueChange={(value) => search = searchMap[value] }>
                    <Select.Trigger class="text-black border-0 md:min-w-[120px]">{search.name}</Select.Trigger>
                    <Select.Content>
                        {#each searchItems as item (item.name)}
                            <Select.Item value={item.value} label={item.name}>
                                {item.name}
                            </Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>