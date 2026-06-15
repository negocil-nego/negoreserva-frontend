<script lang="ts">
    import { usePubGetOrganizationPaginate } from "../data/hooks/use-get-paginate";
    import { OrganizationManage } from "../data/service/organization.service";
    import type { PaginateRequest } from "$lib/feature/pub/organization";
    import GetOrganizationResponseCard from "./get-organization-response-card.svelte";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

    const service = new OrganizationManage();

    const request = $state<PaginateRequest>({
        pageNumber: 0,
        pageSize: 10,
    });

    const query = usePubGetOrganizationPaginate({ service, request });

    const isLoading = $derived($query.isLoading);
    const organizations = $derived($query.data?.content ?? []);
</script>

<div
    class="flex md:flex-row flex-col mx-3 md:mx-0 md:justify-between md:items-center py-3 mt-10"
>
    <div class="my-5 md:space-y-4">
        <div class="text-xl md:text-2xl font-extrabold">
            Conheças os melhores, lugares
        </div>
        <div
            class="text-[12px] md:text-[15px] text-gray-700 dark:text-gray-200 max-w-75 md:max-w-125 text-wrap"
        >
            Se procuras hoteis, hospedaria, restaurantes, ou qualquer outros
            lugar para fazer uma reserva, faça aqui de forma simples e rápida!
            Nas empresas que temos para você.
        </div>
    </div>
</div>
{#if isLoading}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each Array.from({ length: 3 }, (_, i) => i) as i (i)}
            <div class="flex flex-col space-y-3">
                <Skeleton class="h-31.25 w-62.5 rounded-xl" />
                <div class="space-y-2">
                    <Skeleton class="h-4 w-62.5" />
                    <Skeleton class="h-4 w-50" />
                </div>
            </div>
        {/each}
    </div>
{:else if organizations.length == 0}
    
{:else}
    <div
        class="w-full grid grid-cols-2 md:grid-cols-3 gap-3"
        role="region"
        aria-label="Organizations carousel"
    >
        {#each organizations as item (item.organization.uuid)}
            <GetOrganizationResponseCard {item} />
        {/each}
    </div>
{/if}
