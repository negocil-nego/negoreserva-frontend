<script lang="ts">
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import {Search01Icon} from "@hugeicons/core-free-icons";
    import Button from "$lib/components/ui/button/button.svelte";

</script>

<div class="absolute w-11/12 z-10 shadow border bg-white  dark:border-gray-800 dark:bg-slate-950/30 rounded-md">
    <div class="flex items-center gap-2 dark:bg-slate-950/30 py-1 px-2 w-full md:min-h-15">
        <div class="items-center gap-2 hidden md:flex text-slate-500">
            <HugeiconsIcon icon={Search01Icon} size={24} color="currentColor" strokeWidth={1.5}/>
        </div>
        <input type="text"
               class="text-black text-sm w-full bg-transparent placeholder-slate-400 border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent"
               placeholder="Pesquisa Hotel, hospedaria, restaurantes, etc..."
        />
        <Button
                class="flex justify-center items-center cursor-pointer bg-brand rounded-full"
                variant="outline">
            <HugeiconsIcon icon={Search01Icon} size={16} color="currentColor" strokeWidth={2}/>
            <span>Pesquisar</span>
        </Button>
    </div>
</div>
