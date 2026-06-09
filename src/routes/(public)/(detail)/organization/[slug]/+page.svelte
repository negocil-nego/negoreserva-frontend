<script lang="ts">
    import {page} from "$app/state";
    import {OrganizationService, useGetOrganizationDetail} from "$lib/feature/pub/organization";
    import OrganizationSectionInfo from "$lib/feature/pub/organization/ui/detail/organization-section-info.svelte";
    import NavLinkMenus from "$lib/components/navs/nav-link-menus.svelte";
    import OrganizationProfileInfo from "$lib/feature/pub/organization/ui/detail/organization-profile-info.svelte";
    import OrganizationProfileAddress
        from "$lib/feature/pub/organization/ui/detail/organization-profile-address.svelte";
    import OrganizationProfileSocialMedia
        from "$lib/feature/pub/organization/ui/detail/organization-profile-social-media.svelte";
    import OrganizationProfileGallery
        from "$lib/feature/pub/organization/ui/detail/organization-profile-gallery.svelte";
    import OrganizationProfileProducts
        from "$lib/feature/pub/organization/ui/detail/organization-profile-products.svelte";
    import OrganizationProfileCatalogs
        from "$lib/feature/pub/organization/ui/detail/organization-profile-catalogs.svelte";
    import PanelDetailSidebar from "$lib/components/panel-detail-sidebar.svelte";
    import {
        Folder01Icon,
        Image01Icon,
        InformationSquareIcon,
        MapsGlobal01Icon,
        ProductLoadingIcon,
        ThreeDScaleIcon
    } from "@hugeicons/core-free-icons";

    const slug = page.params.slug ?? "";
    const catalogUrl = `/organization/${slug}/catalog`;

    const organizationQuery = useGetOrganizationDetail({
        service: new OrganizationService(),
        get uuidOrSlug() {return slug},
    });

    let data = $derived($organizationQuery?.data);
    let isLoading = $derived($organizationQuery.isFetching);
    let activeSection = $state("organization-section-info");

    const sections = [
        "organization-section-info",
        "organization-section-products",
        "organization-section-catalogs",
        "organization-section-gallery",
        "organization-section-social-media",
        "organization-section-address",
    ];

    function handleScroll() {
        for (const id of sections) {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= 150) {
                activeSection = id;
            }
        }
    }

    $effect(() => {
        document.addEventListener("scroll", handleScroll, {passive: true});
        return () => document.removeEventListener("scroll", handleScroll);
    });
</script>

<PanelDetailSidebar {isLoading}>
    {#snippet left()}
        <NavLinkMenus bind:activeId={activeSection} items={[
            { name: "Sobre",         icon: InformationSquareIcon, url: "organization-section-info"         },
            { name: "Produtos",      icon: ProductLoadingIcon,    url: "organization-section-products"     },
            { name: "Catálogos",     icon: Folder01Icon,          url: "organization-section-catalogs"     },
            { name: "Galeria",       icon: Image01Icon,           url: "organization-section-gallery"      },
            { name: "Redes Sociais", icon: ThreeDScaleIcon,       url: "organization-section-social-media" },
            { name: "Localização",   icon: MapsGlobal01Icon,      url: "organization-section-address"      },
        ]}/>
    {/snippet}
    {#snippet right()}
        <section class="px-5 pb-5 lg:pb-10">
            {#if data}
                <OrganizationSectionInfo {data}/>
                <OrganizationProfileInfo {data}/>
                <OrganizationProfileProducts {data}/>
                <OrganizationProfileCatalogs {data} url={catalogUrl}/>
                <OrganizationProfileGallery {data}/>
                <OrganizationProfileSocialMedia {data}/>
                <OrganizationProfileAddress {data}/>
            {/if}
        </section>
    {/snippet}
</PanelDetailSidebar>