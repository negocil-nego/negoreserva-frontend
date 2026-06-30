<script lang="ts">
  import { OrganizationManage } from "../organization/data/service/organization.service";
  import type { PaginateRequest } from "$lib/feature/pub/organization";
  import { useSearchOrganizationFilter } from "../organization/data/hooks/use-search-organization-filter";
  import { resolve } from "$app/paths";
  import { goto } from "$app/navigation";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

  const service = new OrganizationManage();
  const request = $state<PaginateRequest>({ pageNumber: 0, pageSize: 10 });

  const query = useSearchOrganizationFilter({
    service,
    q: null,
    categoriesUuid: [],
    request,
    isHighlight: true,
  });

  let carousel = $state<HTMLElement | null>(null);
  let isHovered = $state(false);

  const scroll = (direction: "next" | "prev") => {
    if (!carousel) return;
    const scrollAmount = 366;
    carousel.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  $effect(() => {
    const interval = setInterval(() => {
      if (!isHovered && carousel) {
        if (
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth - 10
        ) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("next");
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  });
</script>

<div class="relative container p-2 md:p-4 bg-panel">
  <div
    class="flex flex-col mx-3 md:mx-0 md:justify-between md:items-center mb-2"
  >
    <div class="space-y-1 w-full">
      <div class="text-xl font-extrabold">Empresas em Destaque</div>
      <div class="text-[13px] text-gray-700 dark:text-gray-200 max-w-125">
        Conheça as empresas que se destacam no mercado.
      </div>
    </div>
  </div>

  {#if $query.isLoading}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 container mb-2">
      {#each Array.from({ length: 4 }, (_, i) => i) as i (i)}
        <div class="flex flex-col space-y-3">
          <Skeleton class="h-28 w-52" />
          <div class="space-y-2">
            <Skeleton class="h-4 w-52" />
            <Skeleton class="h-4 w-50" />
          </div>
        </div>
      {/each}
    </div>
  {:else if !$query.data?.content.length}
    <div class="flex justify-center py-8 text-gray-500">
      Nenhuma empresa em destaque.
    </div>
  {:else}
    <div
      class="absolute right-1 top-5 -translate-y-1/2 z-20 flex gap-2 md:right-2 md:top-6"
    >
      <button
        onclick={() => scroll("prev")}
        aria-label="Anterior"
        class="cursor-pointer bg-green-800 text-white w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
        >‹</button
      >
      <button
        onclick={() => scroll("next")}
        aria-label="Próximo"
        class="cursor-pointer bg-green-800 text-white w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
        >›</button
      >
    </div>
    <div
      class="relative"
      role="region"
      aria-label="Carrossel de empresas"
      onmouseenter={() => (isHovered = true)}
      onmouseleave={() => (isHovered = false)}
    >
      <div
        bind:this={carousel}
        class="flex gap-4 overflow-x-auto scroll-smooth py-2 scrollbar-hide"
      >
        {#each $query.data.content as item (item.uuid)}
          <button
            onclick={() =>
              goto(resolve(`/detail/organization/${item.slug}` as any))}
            class="w-50 h-30 relative shrink-0 border border-gray-50 dark:border-gray-800 overflow-hidden cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-linear-to-b from-black/60 to-transparent p-2"
            >
              <span
                class="font-bold text-sm text-white leading-tight block wrap-break-word"
                >{item.name}</span
              >
            </div>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
