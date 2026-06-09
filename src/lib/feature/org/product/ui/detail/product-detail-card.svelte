<script lang="ts">
    import { page } from "$app/stores";
    import {
        ProductService,
        useGetProductDetail,
    } from "$lib/feature/pub/product";
    import ProductImageGallery from "$lib/feature/pub/product/ui/product-image-gallery.svelte";
    import ProductInfoCard from "$lib/feature/pub/product/ui/product-info-card.svelte";
    import ProductTagsBadge from "$lib/feature/pub/product/ui/product-tags-badge.svelte";
    import { PRODUCT_LABEL } from "$lib/feature/pub/product/data/model/product.label";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    let slug = $derived($page.params.slug ?? "");

    const productQuery = useGetProductDetail({
        service: new ProductService(),
        uuidOrSlug: slug,
    });

    let data = $derived($productQuery?.data);
    let isLoading = $derived($productQuery.isFetching);

    let org = $derived(data?.organization);
    let primaryPrice = $derived(
        data?.prices?.find((p) => p.isPrimary) ?? data?.prices?.[0]
    );
</script>

<div class="container md:w-11/12 mx-auto py-4">
    {#if isLoading}
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div class="space-y-4">
                <Skeleton class="h-8 w-3/4" />
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-1/2" />
                <Skeleton class="h-10 w-full" />
            </div>
            <div class="lg:col-span-2">
                <Skeleton class="aspect-square" />
            </div>
        </div>
    {:else if data}
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <!-- Left: Company Info + Payment Methods -->
            <div class="space-y-6">
                {#if org}
                    <div class="rounded-xl border border-border bg-card p-5 space-y-4">
                        <div class="flex items-center gap-3">
                            {#if org.logo}
                                <img src={org.logo} alt={org.name} class="w-12 h-12 rounded-full object-cover" />
                            {:else}
                                <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-lg font-bold">
                                    {org.name?.charAt(0).toUpperCase()}
                                </div>
                            {/if}
                            <div>
                                <h2 class="font-semibold text-base">{org.name}</h2>
                                {#if org.rating}
                                    <div class="flex items-center gap-1 text-sm text-muted-foreground">
                                        <span>{'★'.repeat(org.rating)}{'☆'.repeat(5 - org.rating)}</span>
                                    </div>
                                {/if}
                            </div>
                        </div>
                        {#if org.description}
                            <p class="text-sm text-muted-foreground">{org.description}</p>
                        {/if}
                        <div class="space-y-2 text-sm">
                            {#if org.phone}
                                <div class="flex items-center gap-2 text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span>{org.phone}</span>
                                </div>
                            {/if}
                            {#if org.email}
                                <div class="flex items-center gap-2 text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span>{org.email}</span>
                                </div>
                            {/if}
                            {#if org.address}
                                <div class="flex items-center gap-2 text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span>{org.address}</span>
                                </div>
                            {/if}
                        </div>
                    </div>
                {/if}

                <!-- Payment Methods / Prices -->
                <div class="rounded-xl border border-border bg-card p-5 space-y-4">
                    <h3 class="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                        Preços
                    </h3>
                    {#if data.prices?.length > 0}
                        <div class="space-y-3">
                            {#each data.prices as price (price.uuid)}
                                <div class="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span class="text-sm text-muted-foreground">
                    {PRODUCT_LABEL[price.type] ?? price.type}
                  </span>
                                    <span class="font-semibold">
                    {price.value.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA', minimumFractionDigits: 2 })}
                  </span>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <p class="text-sm text-muted-foreground">Sob Consulta</p>
                    {/if}
                </div>

                <Button class="w-full bg-brand">Solicitar Serviço</Button>
            </div>

            <!-- Right: Product Preview + Tags -->
            <div class="lg:col-span-2 space-y-6">
                <ProductImageGallery files={data.files} />

                <div class="rounded-xl border border-border bg-card p-5 space-y-4">
                    <h1 class="text-2xl font-bold">{data.name}</h1>
                    {#if primaryPrice}
                        <div class="text-3xl text-primary font-bold">
                            {primaryPrice.value.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA', minimumFractionDigits: 2 })}
                        </div>
                    {/if}
                    {#if data.description}
                        <p class="text-muted-foreground">{data.description}</p>
                    {/if}
                </div>

                {#if data.tags?.length > 0}
                    <div class="rounded-xl border border-border bg-card p-5 space-y-3">
                        <h3 class="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                            Informações
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            <ProductTagsBadge tags={data.tags} />
                        </div>
                    </div>
                {/if}

                <ProductInfoCard {data} />
            </div>
        </div>
    {:else}
        <p class="text-center text-muted-foreground">Produto não encontrado</p>
    {/if}
</div>
