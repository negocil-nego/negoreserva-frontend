<script lang="ts">
    import {usePubGetOrganizationPaginate} from "../data/hooks/use-get-paginate";
    import {OrganizationManage} from "../data/service/organization.service";
    import type {PaginateRequest} from "$lib/feature/pub/organization";
    import GetOrganizationResponseCard from "./get-organization-response-card.svelte";
    import {ArrowRight02Icon} from '@hugeicons/core-free-icons';
    import {HugeiconsIcon} from '@hugeicons/svelte';
    import {goto} from "$app/navigation";

    const service = new OrganizationManage();

    const request = $state<PaginateRequest>({
        pageNumber: 0,
        pageSize: 10,
    });

    const query = usePubGetOrganizationPaginate({service, request});

    const isLoading = $derived($query.isLoading);
    const organizations = $derived($query.data?.content ?? []);

    let trackEl = $state<HTMLElement | null>(null);
    let currentIndex = $state(0);
    let autoplayInterval: ReturnType<typeof setInterval> | null = null;
    let isHovered = $state(false);

    const CARD_WIDTH = 350;
    const GAP = 16;

    function getVisibleCount(): number {
        if (!trackEl) return 1;
        return Math.max(1, Math.floor(trackEl.parentElement!.offsetWidth / (CARD_WIDTH + GAP)));
    }

    function maxIndex(): number {
        return Math.max(0, organizations.length - getVisibleCount());
    }

    function prev() {
        currentIndex = currentIndex <= 0 ? maxIndex() : currentIndex - 1;
    }

    function next() {
        currentIndex = currentIndex >= maxIndex() ? 0 : currentIndex + 1;
    }

    function startAutoplay() {
        if (autoplayInterval) return;
        autoplayInterval = setInterval(() => {
            if (!isHovered) next();
        }, 2000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    $effect(() => {
        if (organizations.length > 0) startAutoplay();
        return () => stopAutoplay();
    });

    const translateX = $derived(`translateX(-${currentIndex * (CARD_WIDTH + GAP)}px)`);
</script>

<div class="flex md:flex-row flex-col mx-3 md:mx-0 md:justify-between md:items-center py-3">
    <div>
        <div class="text-xl font-extrabold">Conheças os melhores, lugares</div>
        <div class="text-[12px] text-gray-700 dark:text-gray-200 max-w-75 md:max-w-125 text-wrap">
            Se procuras hoteis, hospedaria, restaurantes, ou qualquer outros lugar para fazer uma reserva,
            faça aqui de forma simples e rápida! Nas empresas que temos para você.
        </div>
    </div>
    <button onclick={() => {
      goto("/search/organization");
    }} class="text-[12px] text-green-900 hover:cursor-pointer font-extrabold flex gap-1 items-center md:-mt-2 mt-2">
        Ver mais
        <HugeiconsIcon
                icon={ArrowRight02Icon}
                size={16}
                color="currentColor"
                strokeWidth={1}
        />
    </button>
</div>
{#if isLoading}
    <p>Loading...</p>
{:else}
    <div class="w-full overflow-hidden"
         onmouseenter={() => { isHovered = true; }}
         onmouseleave={() => { isHovered = false; }}
         role="region"
         aria-label="Organizations carousel"
    >

        <div class="absolute md:top-18 top-32 right-3 md:right-10 z-20 flex gap-2 h-min">
            <button onclick={prev}
                    aria-label="Previous"
                    class="cursor-pointer bg-green-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors">
                ‹
            </button>
            <button onclick={next}
                    aria-label="Next"
                    class="cursor-pointer bg-green-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors">
                ›
            </button>
        </div>


        <div class="overflow-hidden w-full">
            <div bind:this={trackEl}
                 class="flex gap-4 transition-transform duration-300 ease-in-out"
                 style="transform: {translateX};"
            >
                {#each organizations as item (item.organization.uuid)}
                    <div class="w-full md:w-87.5 shrink-0">
                        <GetOrganizationResponseCard {item}/>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}