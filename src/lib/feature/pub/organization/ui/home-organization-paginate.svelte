<script lang="ts">
    import { usePubGetOrganizationPaginate } from "../data/hooks/use-get-paginate";
    import { OrganizationManage } from "../data/service/organization.service";
    import type { PaginateRequest } from "$lib/feature/pub/organization";
    import GetOrganizationResponseCard from "./get-organization-response-card.svelte";

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
    <div class="my-5">
        <div class="text-xl font-extrabold">Conheças os melhores, lugares</div>
        <div
            class="text-[12px] text-gray-700 dark:text-gray-200 max-w-75 md:max-w-125 text-wrap"
        >
            Se procuras hoteis, hospedaria, restaurantes, ou qualquer outros
            lugar para fazer uma reserva, faça aqui de forma simples e rápida!
            Nas empresas que temos para você.
        </div>
    </div>
</div>
{#if isLoading}
    <p>Loading...</p>
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
