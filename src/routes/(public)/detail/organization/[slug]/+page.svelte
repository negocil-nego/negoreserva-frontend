<script lang="ts">
    import {page} from "$app/state";
    import {OrganizationService, useGetOrganizationDetail} from "$lib/feature/pub/organization";
    import OrganizationProfileProducts from "$lib/feature/pub/organization/ui/detail/organization-profile-products.svelte";
    import OrganizationProfileCatalogs from "$lib/feature/pub/organization/ui/detail/organization-profile-catalogs.svelte";
    import OrganizationProfileAddress from "$lib/feature/pub/organization/ui/detail/organization-profile-address.svelte";
    import OrganizationSectionInfo from "$lib/feature/pub/organization/ui/detail/organization-section-info.svelte";
    import ControlButtons from "$lib/components/navs/control-buttons.svelte";
    import ShopCartBadge from "$lib/components/shop-cart-badge.svelte";
    import HomeFooter from "$lib/feature/pub/home/home-footer.svelte";
    import Logo from "$lib/components/logo.svelte";
    import { Skeleton } from "$lib/components/ui/skeleton/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index";

    const slug = page.params.slug ?? "";
    const catalogUrl = `/organization/${slug}/catalog`;
    const productUrl = `/organization/${slug}/product`;

    const organizationQuery = useGetOrganizationDetail({
        service: new OrganizationService(),
        get uuidOrSlug() {
            return slug
        },
    });

    let data = $derived($organizationQuery?.data);
    let isLoading = $derived($organizationQuery.isFetching);
</script>

<nav class="flex items-center justify-between h-15 p-2 border-b fixed top-0 z-50 w-full bg-white dark:bg-slate-950">
    <div class="container relative">
        <div class="flex items-center justify-between w-full h-full absolute z-40">
            <div class="flex items-center gap-2 z-10">
                <Logo varient="contract"/>
            </div>
            <div class="mr-3 flex items-center gap-2 z-10">
                <ShopCartBadge/>
                <div class="cursor-pointer hover:text-foreground transition-colors hidden md:block ">
                    <a href="/">Início</a>
                </div>
                <ControlButtons/>
            </div>
        </div>
    </div>
</nav>

<section class="container mt-20">
    {#if isLoading}
            <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                {#each Array.from({ length: 4 }) as _}
                    <div class="flex flex-col space-y-3">
                        <Skeleton class="h-31.25 w-62.5 rounded-xl" />
                        <div class="space-y-2">
                            <Skeleton class="h-4 w-62.5" />
                            <Skeleton class="h-4 w-50" />
                        </div>
                    </div>
                {/each}
            </div>
    {:else}
        <section class="px-5 pb-5">
            {#if data}
                <OrganizationSectionInfo {data}/>
                <Tabs.Root value="product" class="mt-5">
                    <Tabs.List class="bg-white">
                        <Tabs.Trigger value="product">Produtos</Tabs.Trigger>
                        <Tabs.Trigger value="catalog">Catalogos</Tabs.Trigger>
                        <Tabs.Trigger value="address">Endereços</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="product">
                        <OrganizationProfileProducts {data} url={productUrl}/>
                    </Tabs.Content>
                    <Tabs.Content value="catalog">
                        <OrganizationProfileCatalogs {data} url={catalogUrl}/>
                    </Tabs.Content>
                    <Tabs.Content value="address">
                        <OrganizationProfileAddress {data}/>
                    </Tabs.Content>
                </Tabs.Root>
            {/if}
        </section>

    {/if}
</section>

<div class="w-full mt-10">
    <HomeFooter />
</div>