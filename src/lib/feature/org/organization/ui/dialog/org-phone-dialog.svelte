<script lang="ts">
  import OrgUpdateDataOtpDialog from "./org-update-data-otp-dialog.svelte";
  import ProfileInfoDialog from "$lib/feature/shared/user/ui/dialog/profile-info-dialog.svelte";
  import { SmartPhone02Icon } from "@hugeicons/core-free-icons";
  import { OrgOrganizationUpdateDataService } from "../../data/service/organization-update-data.service";
  import { useOrgSendMessagePhone } from "../../data/hooks/use-org-send-message-phone";

  let {
    value,
  }: {
    value: string | null | undefined;
  } = $props();

  const service = new OrgOrganizationUpdateDataService();
  const sendPhoneMutation = useOrgSendMessagePhone({ service });
  let isLoading = $derived($sendPhoneMutation.isLoading);

  const onSubmit = async (input: string) => {
    if (isLoading) return;
    const result = await $sendPhoneMutation.mutateAsync({ input });
    return result;
  };
</script>

<ProfileInfoDialog
  label="Insira o seu telefone"
  type="text"
  subLabel="Para alterar o telefone, irás receber o código de verificação no novo telefone."
  {value}
  icon={SmartPhone02Icon}
  {onSubmit}
>
  <OrgUpdateDataOtpDialog
    icon={SmartPhone02Icon}
    title="Atualizar telefone"
    description="Insira o novo telefone para receber o código de verificação."
    label="Telefone"
    {value}
  />
</ProfileInfoDialog>
