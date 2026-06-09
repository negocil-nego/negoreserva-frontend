<script lang="ts">
    import ControlButtons from "$lib/components/navs/control-buttons.svelte";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import type {Snippet} from "svelte";
    import Logo from "./logo.svelte";

    type Props = {
        isLoading: boolean;
        classChild?: string;
        isOpen?: boolean;
        left: Snippet;
        right: Snippet;
    }

    let {
        isLoading,
        classChild,
        isOpen = $bindable(true),
        right,
        left
    }: Props = $props();
</script>

<Sidebar.Provider style="--sidebar-width: 8rem; --sidebar-width-mobile: 8rem;">
    <main class="w-full">
        <nav class="flex items-center justify-between h-15 p-2 border-b fixed z-20 w-full bg-white dark:bg-slate-950">
            <div class="flex items-center justify-between w-full absolute z-50">
                <div class="flex items-center gap-2 z-10">
                    <button type="button"  onclick={() => isOpen = !isOpen}>
                        <Sidebar.Trigger />
                    </button>
                    <Logo/>
                </div>
                <div class="mr-3 flex items-center gap-2 z-10">
                    <div class="cursor-pointer hover:text-foreground transition-colors hidden md:block ">
                        <a href="/">Início</a>
                    </div>
                    <ControlButtons/>
                </div>
            </div>
        </nav>
        <Sidebar.Inset class="h-full">
            <section class={`flex h-full ${classChild ?? "mt-15"}`}>
                {#if isOpen }
                    <div class={[
                        "h-full border-r fixed z-10 bg-background",
                        isOpen && "w-50"
                    ]}>
                        {@render left()}
                    </div>
                {/if}
                <div class={[
                    "w-full relative scroll-smooth mt-5 md:mt-10",
                    isOpen && "md:ml-50"
                ]}>
                    {#if isLoading}
                        <p>Carregando...</p>
                    {:else}
                        {@render right()}
                    {/if}
                </div>
            </section>
        </Sidebar.Inset>
    </main>
</Sidebar.Provider>
