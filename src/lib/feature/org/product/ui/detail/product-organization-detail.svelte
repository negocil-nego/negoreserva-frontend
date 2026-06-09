<script lang="ts">
    import {Call02Icon, City02Icon, Mail01Icon, StarIcon} from "@hugeicons/core-free-icons";
    import InfoRow from "$lib/components/info-row.svelte";
    import type {ProductDetailResponse} from "$lib/feature/pub/product";

    let {data}: { data: ProductDetailResponse } = $props();

    const DESCRIPTION_LIMIT = 100;

    let organization = $derived(data.organization);
    let descriptionLength = $derived(organization.description?.length ?? 0);
    let isTruncatable = $derived(descriptionLength > DESCRIPTION_LIMIT);

    let isExpanded = $state(false);

    let visibleDescription = $derived(
        isTruncatable && !isExpanded
            ? `${organization.description?.substring(0, DESCRIPTION_LIMIT)}...`
            : organization.description
    );

    function toggleExpand() {
        isExpanded = !isExpanded;
    }
</script>

<div class="mt-15 flex h-full w-full flex-col pl-0 ml-0">
    <h2 class="mb-5 text-lg font-bold text-gray-900 dark:text-gray-100">
        Informações da empresa
    </h2>

    <div class="w-full flex justify-center">
        <img
                src={organization.image}
                alt={`Logo da empresa ${organization.name}`}
                class="h-[200px] w-full rounded-2xl object-cover"
        />
    </div>

    {#if organization.description}
        <div class="mt-5 w-full">
            <p class="font-bold italic">Descrição</p>
            <div class="mt-3 w-full">
                {#if isTruncatable}
                    <button
                            class="text-left leading-relaxed"
                            onclick={toggleExpand}
                            aria-expanded={isExpanded}
                    >
                        {visibleDescription}
                        <span class="ml-1 text-sm font-bold italic text-primary-600 dark:text-primary-400">
                            {isExpanded ? "ver menos" : "ver mais"}
                        </span>
                    </button>
                {:else}
                    <p class="leading-relaxed">{organization.description}</p>
                {/if}
            </div>
        </div>
    {/if}

    <hr class="my-5"/>

    <InfoRow label="Nome" icon={City02Icon} value={organization.name} isWrap/>
    <InfoRow label="Email" icon={Mail01Icon} value={organization.email} isWrap/>
    <InfoRow label="Telefone" icon={Call02Icon} value={organization.phone} isWrap/>

    {#if organization.rating}
        <InfoRow label="Avaliação" icon={StarIcon} value={organization.rating}/>
    {/if}
</div>