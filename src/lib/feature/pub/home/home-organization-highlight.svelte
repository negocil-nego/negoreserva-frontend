<script lang="ts">
    import { OrganizationManage } from "../organization/data/service/organization.service";
    import type { PaginateRequest } from "$lib/feature/pub/organization";
    import { useSearchOrganizationFilter } from "../organization/data/hooks/use-search-organization-filter";
    import { resolve } from "$app/paths";
    import { goto } from "$app/navigation";

    const service = new OrganizationManage();

    const request = $state<PaginateRequest>({
        pageNumber: 0,
        pageSize: 10,
    });

    const query = useSearchOrganizationFilter({
        service,
        q: null,
        categoriesUuid: [],
        request,
        isHighlight: true,
    });

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
        return Math.max(
            1,
            Math.floor(trackEl.parentElement!.offsetWidth / (CARD_WIDTH + GAP)),
        );
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

    const translateX = $derived(
        `translateX(-${currentIndex * (CARD_WIDTH + GAP)}px)`,
    );
</script>

<div class="container p-2 md:p-4 shadow-sm border rounded-md bg-panel">
    <div
        class="flex md:flex-row flex-col mx-3 md:mx-0 md:justify-between md:items-center"
    >
        <div>
            <div class="text-xl font-extrabold">Empresas em Destaque</div>
            <div
                class="text-[12px] text-gray-700 dark:text-gray-200 max-w-75 md:max-w-125 text-wrap"
            >
                Conheça as empresas que se destacam no mercado.
            </div>
        </div>
    </div>

    {#if isLoading}
        <div class="flex justify-center py-8">
            <p class="text-gray-500">Loading...</p>
        </div>
    {:else if organizations.length === 0}
        <div class="flex justify-center py-8">
            <p class="text-gray-500">Nenhuma empresa em destaque no momento.</p>
        </div>
    {:else}
        <div
            class="w-full overflow-hidden"
            onmouseenter={() => {
                isHovered = true;
            }}
            onmouseleave={() => {
                isHovered = false;
            }}
            role="region"
            aria-label="Highlighted organizations carousel"
        >
            <div
                class="relative flex justify-end md:top-0 top-0 right-3 md:right-10 z-20 gap-2 h-min"
            >
                <button
                    onclick={prev}
                    aria-label="Previous"
                    class="cursor-pointer bg-green-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                    ‹
                </button>
                <button
                    onclick={next}
                    aria-label="Next"
                    class="cursor-pointer bg-green-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                    ›
                </button>
            </div>

            <div class="overflow-hidden w-full relative">
                <div
                    bind:this={trackEl}
                    class="flex transition-transform duration-300 ease-in-out gap-10"
                    style="transform: {translateX};"
                >
                    {#each organizations as item (item.uuid)}
                        <div class="w-50">
                            <button
                                onclick={() =>
                                    goto(resolve(`/organization/${item.slug}`))}
                                class="w-full text-left rounded-md border border-ray-50 dark:border-gray-800 dark:bg-slate-950/30 overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    class="w-full h-30 object-fill"
                                />
                                <div class="p-3 absolute bottom-1">
                                    <div class="font-bold text-sm truncate">
                                        {item.name}
                                    </div>
                                </div>
                            </button>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>
