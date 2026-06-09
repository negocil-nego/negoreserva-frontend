<script lang="ts">
    import {page} from "$app/state";
    import Logo from "$lib/components/logo.svelte";
    import MenuLinks from "$lib/components/navs/menu-links.svelte";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import {
        OrganizationService,
        useGetOrganizationDetail
    } from "$lib/feature/pub/organization";
    import type {ProductDetailResponse} from "$lib/feature/pub/product";
    import {cn} from "$lib/utils";
    import {ShoppingBasket01Icon} from "@hugeicons/core-free-icons";
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import {catalogCartCount, catalogStore} from "$lib/stores/catalog.store";
    import type {CatalogResponse, ProductPriceGetOrgResponse} from "$lib/feature/pub/organization/data/model/organization.model";

    const organizationService = new OrganizationService();

    const organizationQuery = useGetOrganizationDetail({
        service: organizationService,
        get uuidOrSlug() {
            return page.params.slug ?? "";
        },
    });

    let data = $derived($organizationQuery?.data);
    let isLoading = $derived($organizationQuery.isFetching);
    let selectedCatalogSlug = $state("");
    let selectedCatalog = $derived(data?.catalogs?.find((catalog) => catalog.slug === selectedCatalogSlug));
    let products = $state<ProductDetailResponse[]>([]);
    let isLoadingProducts = $state(false);
    let quantities = $state<Record<string, number>>({});

    $effect(() => {
        const firstCatalog = data?.catalogs?.[0];
        if (firstCatalog && !selectedCatalogSlug) {
            selectedCatalogSlug = firstCatalog.slug;
        }
    });

    $effect(() => {
        const catalogSlug = selectedCatalogSlug;
        if (!catalogSlug) {
            products = [];
            return;
        }

        isLoadingProducts = true;
        organizationService.catalogProducts(catalogSlug)
            .then((items) => {
                if (selectedCatalogSlug === catalogSlug) {
                    products = items;
                }
            })
            .catch((error) => {
                console.error("Failed to fetch catalog products:", error);
                if (selectedCatalogSlug === catalogSlug) {
                    products = [];
                }
            })
            .finally(() => {
                if (selectedCatalogSlug === catalogSlug) {
                    isLoadingProducts = false;
                }
            });
    });

    const cartCount = $derived($catalogCartCount);

    function productImage(product: ProductDetailResponse): string | null {
        return product.image ||
            product.files?.find((file) => file.isPrimary && file.url)?.url ||
            product.files?.find((file) => file.url)?.url ||
            null;
    }

    function productPrice(product: ProductDetailResponse): ProductPriceGetOrgResponse | null {
        return product.prices?.find((price) => price.isPrimary) ??
            [...(product.prices ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0] ??
            null;
    }

    function quantityOf(product: ProductDetailResponse): number {
        return quantities[product.uuid] ?? 1;
    }

    function setQuantity(product: ProductDetailResponse, value: number) {
        quantities = {...quantities, [product.uuid]: Math.max(1, value)};
    }

    function decrease(product: ProductDetailResponse) {
        setQuantity(product, quantityOf(product) - 1);
    }

    function increase(product: ProductDetailResponse) {
        setQuantity(product, quantityOf(product) + 1);
    }

    function addToCatalogCart(product: ProductDetailResponse) {
        if (!selectedCatalog) return;
        catalogStore.addProduct({
            catalog: selectedCatalog as CatalogResponse,
            product,
            quantity: quantityOf(product),
            image: productImage(product),
            price: productPrice(product),
        });
    }

    function formatPrice(value?: number | null): string {
        return new Intl.NumberFormat("pt-AO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value ?? 0);
    }
</script>

<nav class="h-14 w-full fixed top-0 z-40 bg-background/95 backdrop-blur-md flex items-center justify-between px-5 md:px-10 border-b">
    <Logo />
    <MenuLinks />
</nav>

{#if !isLoading}
    <section class="min-h-screen bg-[#f7f8f7] px-5 py-10 lg:px-10 lg:pb-24 mt-14">
        {#if data}
            <section id="organization-section-catalogs">
                <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div class="text-xl font-bold text-foreground">Cardápios</div>
                        <p class="mt-1 text-sm text-muted-foreground">
                            Explore os catálogos de {data.name}
                        </p>
                    </div>

                    <div class="hidden h-11 md:block"></div>
                </div>

                {#if data.catalogs && data.catalogs.length > 0}
                    <Carousel.Root class="w-full relative">
                        <Carousel.Content class="-ml-4 w-full">
                            {#each data.catalogs as catalog (catalog.uuid)}
                                <Carousel.Item class="basis-[78%] pl-4 sm:basis-[46%] lg:basis-1/4">
                                    <button
                                        type="button"
                                        onclick={() => selectedCatalogSlug = catalog.slug}
                                        class={cn(
                                            "group relative h-20 w-full overflow-hidden rounded-lg border bg-muted text-left shadow-sm transition-all",
                                            selectedCatalogSlug === catalog.slug
                                                ? "border-green-700 ring-2 ring-green-700"
                                                : "border-transparent hover:border-green-700/40"
                                        )}
                                    >
                                        {#if catalog.imgUrl || data.image}
                                            <img
                                                src={catalog.imgUrl || data.image}
                                                alt={catalog.name}
                                                class="absolute inset-0 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        {/if}
                                        <span class="absolute inset-0 bg-black/35"></span>
                                        {#if selectedCatalogSlug === catalog.slug}
                                            <span class="absolute right-3 top-3 rounded-full bg-green-700 px-3 py-1 text-xs font-bold uppercase text-white">
                                                Active
                                            </span>
                                        {/if}
                                        <span class="absolute inset-x-0 bottom-0 p-5 text-lg font-bold text-white">
                                            {catalog.name}
                                        </span>
                                    </button>
                                </Carousel.Item>
                            {/each}
                        </Carousel.Content>
                        <Carousel.Previous class="hidden md:flex -top-15 left-auto right-14 translate-y-0 border-green-700/30 bg-background shadow-sm"/>
                        <Carousel.Next class="hidden md:flex -top-15 right-0 translate-y-0 border-green-700/30 bg-background shadow-sm"/>
                    </Carousel.Root>

                    <section class="mt-5">
                        <div class="mb-3 flex flex-col gap-3 border-b pb-3 md:flex-row md:items-center md:justify-between">
                            <div class="text-xl font-bold">{"Produtos"}</div>
                        </div>

                        {#if isLoadingProducts}
                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {#each Array.from({length: 4}) as _}
                                    <div class="h-[28rem] animate-pulse rounded-lg border bg-background"></div>
                                {/each}
                            </div>
                        {:else if products.length > 0}
                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {#each products as product (product.uuid)}
                                    {@const image = productImage(product)}
                                    {@const price = productPrice(product)}
                                    <article class="overflow-hidden rounded-sm border bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                                        <div class="relative aspect-[4/3] overflow-hidden bg-muted">
                                            {#if image}
                                                <img src={image} alt={product.name} class="h-full w-full object-cover"/>
                                            {:else}
                                                <div class="flex h-full w-full items-center justify-center text-5xl font-bold text-muted-foreground/25">
                                                    {product.name.charAt(0)}
                                                </div>
                                            {/if}
                                        </div>
                                        <div class="flex  flex-col p-2">
                                            <div class="text-[15px] mt-1 font-semibold leading-tight">{product.name.substring(0, 100)}</div>
                                            <p class="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                                {product.description}
                                            </p>

                                            <div class="mt-auto">
                                                <p class="text-2xl font-extrabold text-green-700">
                                                    {formatPrice(price?.value)}
                                                    <span class="text-sm font-medium text-foreground"> kz</span>
                                                </p>

                                                <div class="mt-5 grid grid-cols-[1fr_1.1fr] gap-3">
                                                    <div class="grid h-11 grid-cols-3 overflow-hidden rounded-md border border-green-700/25 bg-muted/30">
                                                        <button type="button" class="text-xl" onclick={() => decrease(product)}>−</button>
                                                        <span class="flex items-center justify-center text-sm font-semibold">{quantityOf(product)}</span>
                                                        <button type="button" class="text-xl" onclick={() => increase(product)}>+</button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        class="flex h-11 items-center justify-center gap-2 rounded-md bg-green-700 px-4 font-bold text-white hover:bg-green-800"
                                                        onclick={() => addToCatalogCart(product)}
                                                    >
                                                        <HugeiconsIcon icon={ShoppingBasket01Icon} size={18} color="currentColor" strokeWidth={2}/>
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                {/each}
                            </div>
                        {:else}
                            <p class="rounded-lg border border-dashed bg-background p-8 text-center text-sm text-muted-foreground">
                                Nenhum produto disponível neste catálogo.
                            </p>
                        {/if}
                    </section>
                {:else}
                    <p class="rounded-lg border border-dashed bg-background p-8 text-center text-sm text-muted-foreground">
                        Nenhum catálogo disponível.
                    </p>
                {/if}
            </section>
        {/if}
    </section>
{/if}

<button
    type="button"
    class="fixed bottom-8 right-8 z-30 flex size-16 items-center justify-center rounded-full bg-green-700 text-white shadow-xl hover:bg-green-800"
>
    <HugeiconsIcon icon={ShoppingBasket01Icon} size={28} color="currentColor" strokeWidth={2}/>
    {#if cartCount > 0}
        <span class="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-pink-400 text-xs font-bold text-white">
            {cartCount}
        </span>
    {/if}
</button>
