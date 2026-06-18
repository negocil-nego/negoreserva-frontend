<script lang="ts">
    import HomeFooter from "$lib/feature/pub/home/home-footer.svelte";
    import HomeNavbar from "$lib/feature/pub/home/home-navbar.svelte";
    import {ArrowLeft01Icon} from "@hugeicons/core-free-icons";
    import {HugeiconsIcon} from '@hugeicons/svelte';

    interface Props {
        title: string;
        subtitle?: string;
        updatedAt: string;
        children: import("svelte").Snippet;
        footerActions?: import("svelte").Snippet;
    }

    let {title, subtitle, updatedAt, children, footerActions}: Props = $props();
</script>

<div class="bg-brand fixed z-30 w-full shadow-sm">
    <HomeNavbar/>
</div>

<div class="min-h-screen bg-background px-6 py-12 pb-20 sm:px-4 sm:py-6">
    <div class="mx-auto max-w-190 pt-5 sm:pt-20">
        <header class="mt-5 mb-10 border-b border-green-700/25 pb-8">
            <div class="flex items-center gap-3">
                <a class="bg-brand rounded-full p-2" href="/">
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={1}/>
                </a>
                <div class="mt-0 text-xl md:text-3xl font-extrabold tracking-tight text-[#1a2e1c] sm:text-2xl dark:text-green-700" style="line-height:1.15">
                    {title}
                </div>
            </div>
            {#if subtitle}
                <p class="mt-3 md:mt-10 text-base leading-relaxed text-gray-500 dark:text-gray-300">{subtitle}</p>
            {/if}
            <p class="mt-5 inline-flex rounded-md border-gray-200 bg-white px-3 py-1.5 font-mono text-xs text-gray-500">
                Última atualização: {updatedAt}
            </p>
        </header>

        <div class="rounded-xl bg-panel px-2 md:px-10 py-1 md:py-4 shadow-sm sm:px-5 sm:py-2">
            {@render children()}
        </div>

        <footer class="mt-5 md:mt-10 md:pt-8">
            {#if footerActions}
                <div class="md:mb-8 flex flex-wrap gap-3">
                    {@render footerActions()}
                </div>
            {/if}
        </footer>
    </div>
</div>

<div class="w-full -mt-10 md:mt-0">
    <HomeFooter/>
</div>
