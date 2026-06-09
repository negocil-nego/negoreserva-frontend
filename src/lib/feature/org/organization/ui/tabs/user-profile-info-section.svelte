<script lang="ts">
  import { User02Icon } from "@hugeicons/core-free-icons";
  import type { OrgOrganizationProfile } from "$lib/feature/org/organization/data/model/organization";
  import ProfileInfoRow from "$lib/feature/shared/user/ui/profile-info-row.svelte";
  import { useUserEdit } from "$lib/feature/shared/user/data/hooks/use-user-edit";
  import { UserService } from "$lib/feature/shared/user/data/service/user.service";
  import OrgUserEmailDialog from "../dialog/org-user-email-dialog.svelte";
  import OrgUserPhoneDialog from "../dialog/org-user-phone-dialog.svelte";

  let { data }: { data: OrgOrganizationProfile } = $props();

  const service = new UserService();

  let userUpdateMutation = useUserEdit({
    service,
  });

  let isLoading = $derived($userUpdateMutation.isLoading);

  const editUserName = async (value: string) => {
    if (isLoading) return;
    await $userUpdateMutation.mutateAsync({
      name: value,
    });
  };
</script>

<div>
  <div class="px-4 sm:px-0 hidden">
    <h3 class="text-base/7 font-semibold text-foreground">
      Informações do Utilizador
    </h3>
    <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">
      Dados pessoais e de autenticação.
    </p>
  </div>
  <div class="mt-6 border-t border-border">
    <dl class="divide-y divide-border">
      <ProfileInfoRow
        label="Nome"
        icon={User02Icon}
        subLabel="Nome do utilizador."
        value={data.user.name}
        onSubmit={editUserName}
        {isLoading}
      />
      <OrgUserEmailDialog value={data} />
      <OrgUserPhoneDialog value={data} />
    </dl>
  </div>
</div>
