<script lang="ts">
  import { useProfileUser } from "$lib/feature/shared/user/data/hooks/use-profile-user";
  import { UserService } from "$lib/feature/shared/user/data/service/user.service";
  import { useUserUpdateLogo } from "$lib/feature/shared/user/data/hooks/use-user-update-logo";
  import UserProfileInfoSection from "$lib/feature/org/organization/ui/tabs/user-profile-info-section.svelte";
  import SecurityProfileSection from "$lib/feature/org/organization/ui/tabs/security-profile-section.svelte";
  import ProfileUploadRow from "$lib/feature/shared/user/ui/profile-upload-row.svelte";
  import { userAuthStore } from "$lib/stores/user-auth.store";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import { Image01Icon, User02Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  const userService = new UserService();
  
  const profileQuery = useProfileUser({
    service: userService
  });

  const updateLogoMutation = useUserUpdateLogo({
    service: userService
  });

  let userAuth = $derived(userAuthStore.getUserAuthResponse());
  let userProfile = $derived($profileQuery?.data);
  let isLoading = $derived($profileQuery.isFetching);

  // Mock OrgOrganizationProfile interface to reuse existing subcomponents
  let mockProfileData = $derived(userProfile ? {
    user: {
      uuid: userProfile.uuid,
      username: userProfile.name,
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone || "",
    },
    organization: {
      uuid: "",
      name: "",
      email: "",
      description: "",
      phone: "",
      address: "",
      rating: 0,
      logo: userAuth?.logo || "",
      image: "",
      video: "",
      slug: "",
      province: "",
      municipality: "",
    },
    updateDataResponse: [],
    addresses: [],
    socialMedia: null,
  } : null);

  const handleLogoChange = async (file: File) => {
    await $updateLogoMutation.mutateAsync(file);
  };
</script>

<div class="space-y-6 px-2">
  <!-- Client Profile Banner and Avatar -->
  <div class="relative w-full flex flex-col items-center">
    <div class="h-32 md:h-40 w-full overflow-hidden rounded-xl bg-linear-to-r from-teal-400 via-brand to-purple-600 relative">
      <div class="absolute inset-0 bg-black/10 backdrop-blur-xs"></div>
    </div>
    <div class="relative -mt-16 mb-2">
      {#if userAuth?.logo}
        <img
          src={userAuth.logo}
          alt={userAuth.name}
          class="size-28 md:size-32 rounded-full border-4 border-background bg-card shadow-md object-cover"
        />
      {:else}
        <div class="size-28 md:size-32 rounded-full border-4 border-background bg-muted flex items-center justify-center shadow-md">
          <HugeiconsIcon icon={User02Icon} class="size-12 text-muted-foreground" />
        </div>
      {/if}
    </div>
    <h2 class="text-xl font-bold text-foreground">{userAuth?.name}</h2>
    <p class="text-sm text-muted-foreground">{userAuth?.email}</p>
  </div>

  <section class="mt-8">
    <Tabs.Tabs value="user">
      <div class="flex items-center justify-between rounded-xl overflow-x-auto">
        <Tabs.TabsList class="bg-gray-50 dark:bg-gray-900 gap-5">
          <Tabs.TabsTrigger value="user">Usuário</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="security">Segurança</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="gallery">Galeria</Tabs.TabsTrigger>
        </Tabs.TabsList>
      </div>

      {#if isLoading}
        <div class="space-y-4 mt-6">
          <Skeleton class="h-4 w-48"/>
          <Skeleton class="h-4 w-64"/>
          <Skeleton class="h-4 w-56"/>
        </div>
      {:else if mockProfileData}
        <Tabs.TabsContent value="user" class="mt-6">
          <UserProfileInfoSection data={mockProfileData} />
        </Tabs.TabsContent>
        <Tabs.TabsContent value="security" class="mt-6">
          <SecurityProfileSection />
        </Tabs.TabsContent>
        <Tabs.TabsContent value="gallery" class="mt-6">
          <div class="divide-y divide-border rounded-xl border border-border bg-card p-6 shadow-sm">
            <ProfileUploadRow
              label="Foto de Perfil"
              subLabel="Esta é a sua foto de identificação que será apresentada no sistema. Recomenda-se uma imagem quadrada (1:1), preferencialmente em PNG ou JPG de boa qualidade."
              icon={Image01Icon}
              value={userAuth?.logo}
              accept="image/*"
              fileType="image"
              onsubmit={handleLogoChange}
            />
          </div>
        </Tabs.TabsContent>
      {/if}
    </Tabs.Tabs>
  </section>
</div>
