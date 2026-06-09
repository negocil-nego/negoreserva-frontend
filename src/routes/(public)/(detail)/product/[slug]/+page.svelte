<script lang="ts">
    import {page} from "$app/state";
    import {ProductService, useGetProductDetail} from "$lib/feature/pub/product";
    import {City01Icon, Money01Icon, ProductLoadingIcon} from "@hugeicons/core-free-icons";
    import NavLinkMenus from "$lib/components/navs/nav-link-menus.svelte";
    import PanelDetailSidebar from "$lib/components/panel-detail-sidebar.svelte";
    import ProductOrganizationDetail from "$lib/feature/org/product/ui/detail/product-organization-detail.svelte";
    import ProductPaymentDetail from "$lib/feature/org/product/ui/detail/product-payment-detail.svelte";
    import ProductPreviewDetail from "$lib/feature/org/product/ui/detail/product-preview-detail.svelte";
    import CartCheckModal from "$lib/feature/org/product/ui/detail/cart-check-modal.svelte";
    import {MOBILE_BREAKPOINT} from "$lib/hooks/use-mobile.svelte";
    import ProductPaymentDrawer from "$lib/feature/org/product/ui/product-payment-drawer.svelte";

    const slug = page.params.slug ?? ""

    const productQuery = useGetProductDetail({
        service: new ProductService(),
        get uuidOrSlug() { return slug ?? "" },
    });

    let data = $derived($productQuery?.data);
    let isLoading = $derived($productQuery.isFetching);
    let activeSection = $state("organization-section-info");
    let isOpen = $state(true);
    let windowWidth = $state(0);
    let windowHeight = $state(0);
    let showCartModal = $state(false);

    const GRID_3 = 1422;
    let isMobile = $derived(windowWidth <= MOBILE_BREAKPOINT);
    let isGrid3 = $derived(windowWidth > GRID_3);
    let showExtraCol = $derived(!isOpen && !isMobile);

    let gridCols = $derived(
        isGrid3
            ? "grid-cols-[4fr_5fr_8fr]"
            : showExtraCol
                ? "grid-cols-[5fr_5fr_7fr]"
                : "grid-cols-1 md:grid-cols-[6fr_8fr]"
    );

    $effect(() => {
        function handleResize() {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    $effect(() => {
        if (isMobile) isOpen = false;
    });
</script>

<CartCheckModal bind:open={showCartModal} />

<PanelDetailSidebar {isLoading} classChild="mt-0" bind:isOpen>
    {#snippet left()}
        <aside class="pt-15 bg-background h-full">
            <NavLinkMenus bind:activeId={activeSection} items={[
                { name: "Organização", icon: City01Icon,       url: "organization-section-info", },
                { name: "Pagamento",   icon: Money01Icon,      url: "organization-section-payment" },
                { name: "Produto",     icon: ProductLoadingIcon, url: "organization-section-product" },
            ]}/>
        </aside>
    {/snippet}
    {#snippet right()}
        {#if data}
            <section class="h-full w-full grid {gridCols} gap-3" id="organization-section-info">
                {#if isGrid3 || showExtraCol}
                    <div class="border-r border-gray-200 dark:border-gray-800 relative h-full">
                        <div class="justify-center items-center hidden md:flex flex-col px-5 top-0 h-screen overflow-y">
                            <ProductOrganizationDetail {data}/>
                        </div>
                    </div>
                {/if}
                <div class="border-r border-gray-200 dark:border-gray-800 relative h-full hidden md:block" id="organization-section-payment">
                    <div class="justify-center items-center hidden md:flex flex-col px-5 top-0 h-screen overflow-y">
                        <ProductPaymentDetail {data}/>
                    </div>
                </div>
                <div class="h-full px-5 md:flex md:flex-col pt-15" id="organization-section-product">
                    <ProductPreviewDetail {data}/>
                    <div class="md:hidden w-full mb-5 -mt-5 pb-5">
                        <ProductPaymentDrawer {data} />
                    </div>
                </div>
            </section>
        {/if}
    {/snippet}
</PanelDetailSidebar>