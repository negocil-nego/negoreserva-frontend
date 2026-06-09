<script lang="ts">
    import {useOrgGetOrganization} from "$lib/feature/org/organization/data/hooks/use-get-organization";
    import {OrgOrganizationService} from "$lib/feature/org/organization/data/service/organization.service";
    import ProfileAvatarPanel from "$lib/feature/org/organization/ui/profile-avatar-panel.svelte";
    import OrganizationProfileInfoSection
        from "$lib/feature/org/organization/ui/tabs/organization-profile-section.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
    import UserProfileInfoSection from "$lib/feature/org/organization/ui/tabs/user-profile-info-section.svelte";
    import SecurityProfileSection from "$lib/feature/org/organization/ui/tabs/security-profile-section.svelte";
    import GalleryProfileSection from "$lib/feature/org/organization/ui/tabs/gallery-profile-section.svelte";
    import AddressProfileSection from "$lib/feature/org/organization/ui/tabs/address-profile-section.svelte";
    import SocialMediaProfileSection from "$lib/feature/org/organization/ui/tabs/social-media-profile-section.svelte";

    const organization = useOrgGetOrganization({
        service: new OrgOrganizationService(),
    });

    let data = $derived($organization?.data);
    let isLoading = $derived($organization.isFetching);
</script>

<div class="space-y-6 px-2">
    {#if isLoading}
        <div class="flex items-center gap-4">
            <Skeleton class="size-10 rounded-full"/>
            <div class="space-y-2">
                <Skeleton class="h-4 w-40"/>
                <Skeleton class="h-3 w-56"/>
            </div>
        </div>
    {:else if data}
        <ProfileAvatarPanel organization={data.organization}/>
    {/if}

    <section class="lg:mt-20">
        <Tabs.Tabs value="user">
            <div class="flex items-center justify-between rounded-xl overflow-x-auto">
                <Tabs.TabsList class="bg-gray-50 dark:bg-gray-900 gap-5">
                    <Tabs.TabsTrigger value="user">Usuário</Tabs.TabsTrigger>
                    <Tabs.TabsTrigger value="organization">Organização</Tabs.TabsTrigger>
                    <Tabs.TabsTrigger value="address">Endereço</Tabs.TabsTrigger>
                    <Tabs.TabsTrigger value="social-media">Redes Sociais</Tabs.TabsTrigger>
                    <Tabs.TabsTrigger value="security">Segurança</Tabs.TabsTrigger>
                    <Tabs.TabsTrigger value="gallery">Galeria</Tabs.TabsTrigger>
                </Tabs.TabsList>
            </div>

            {#if isLoading}
                <div class="space-y-4 mt-4">
                    <Skeleton class="h-4 w-48"/>
                    <Skeleton class="h-4 w-64"/>
                    <Skeleton class="h-4 w-56"/>
                </div>
            {:else if data}
                <Tabs.TabsContent value="user">
                    <UserProfileInfoSection {data}/>
                </Tabs.TabsContent>
                <Tabs.TabsContent value="organization">
                    <OrganizationProfileInfoSection {data}/>
                </Tabs.TabsContent>
                <Tabs.TabsContent value="address">
                    <AddressProfileSection {data}/>
                </Tabs.TabsContent>
                <Tabs.TabsContent value="social-media">
                    <SocialMediaProfileSection {data}/>
                </Tabs.TabsContent>
                <Tabs.TabsContent value="security">
                    <SecurityProfileSection/>
                </Tabs.TabsContent>
                <Tabs.TabsContent value="gallery">
                    <GalleryProfileSection {data}/>
                </Tabs.TabsContent>
            {/if}
        </Tabs.Tabs>
    </section>
</div>
