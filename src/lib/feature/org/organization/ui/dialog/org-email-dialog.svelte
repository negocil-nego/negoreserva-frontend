<script lang="ts">
  import OrgUpdateDataOtpDialog from "./org-update-data-otp-dialog.svelte";
  import ProfileInfoDialog from "$lib/feature/shared/user/ui/dialog/profile-info-dialog.svelte";
  import { Mail01Icon } from "@hugeicons/core-free-icons";
  import { OrgOrganizationUpdateDataService } from "../../data/service/organization-update-data.service";
  import { useOrgSendMessageEmail } from "../../data/hooks/use-org-send-message-email";

  let {
    value,
  }: {
    value: string | null | undefined;
  } = $props();

  const service = new OrgOrganizationUpdateDataService();
  const sendEmailMutation = useOrgSendMessageEmail({ service });
  let isLoading = $derived($sendEmailMutation.isLoading);

  const onSubmit = async (input: string) => {
    if (isLoading) return;
    const result = await $sendEmailMutation.mutateAsync({ input });
    return result;
  };
</script>

<ProfileInfoDialog
  label="Insira o seu email"
  type="email"
  subLabel="Para alterar o email, irás receber o código de verificação no novo email."
  {value}
  icon={Mail01Icon}
  {onSubmit}
>
  <OrgUpdateDataOtpDialog
    icon={Mail01Icon}
    title="Atualizar Email"
    description="Insira o email para enviar o código de verificação."
    label="Email"
    {value}
  />
</ProfileInfoDialog>
