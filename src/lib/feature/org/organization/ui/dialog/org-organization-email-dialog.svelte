<script lang="ts">
  import { Mail01Icon } from "@hugeicons/core-free-icons";
  import {
    UpdateDataFielEnum,
    UpdateDataTypeEnum,
    type OrgOrganizationProfile,
  } from "$lib/feature/org/organization/data/model/organization";
  import SendOtpDialog from "$lib/feature/shared/user/ui/dialog/send-otp-dialog.svelte";
  import ConfirmOtpDialog from "$lib/feature/shared/user/ui/dialog/confirm-otp-dialog.svelte";
  import { OrgOrganizationUpdateDataService } from "../../data/service/organization-update-data.service";
  import { useOrganizationSendMessageEmail } from "../../data/hooks/use-organization-send-message-email";
  import { useOrgUpdateDataReset } from "../../data/hooks/use-org-update-data-reset";
  import { useCountdown } from "$lib/hooks/use-countdown.svelte";
  import ProfileInfoDialog from "$lib/feature/shared/user/ui/dialog/profile-info-dialog.svelte";

  let {
    value,
  }: {
    value: OrgOrganizationProfile;
  } = $props();

  const service = new OrgOrganizationUpdateDataService();
  let mutateSendEmail = useOrganizationSendMessageEmail({ service });
  let mutateUpdateData = useOrgUpdateDataReset({ service });

  const onSendOtp = async (email: string) => {
    if (isLoading) return;
    await $mutateSendEmail.mutateAsync({ input: email });
  };

  const onConfirmOtp = async (otp: string) => {
    if (isLoading) return;
    await $mutateUpdateData.mutateAsync({
      id: updateDataResponse!.id,
      otp,
    });
  };

  let isLoading = $derived(
    $mutateSendEmail.isLoading || $mutateUpdateData.isLoading,
  );

  let updateDataResponse = $derived(
    value.updateDataResponse.find(
      (item) =>
        item.field == UpdateDataFielEnum.EMAIL &&
        item.type == UpdateDataTypeEnum.ORGANIZATION,
    ),
  );

  const countdown = useCountdown(() => updateDataResponse?.expiredAt);
</script>

<ProfileInfoDialog
  label="Insira o email da organização"
  type="email"
  subLabel="Para alterar o email, irás receber o código de verificação no novo email."
  value={value.organization.email}
  icon={Mail01Icon}
  expiredAt={updateDataResponse?.expiredAt}
>
  {#if updateDataResponse}
    <ConfirmOtpDialog
      title="Confirmar Email"
      description="Insira o código de verificação que foi enviado para o novo email."
      label="Email"
      {onConfirmOtp}
      {isLoading}
      isExpired={countdown.isExpired}
    />
  {:else}
    <SendOtpDialog
      title="Atualizar Email"
      description="Insira o email para enviar o código de verificação."
      label="Email"
      icon={Mail01Icon}
      value={value.organization.email}
      {onSendOtp}
      {isLoading}
    />
  {/if}
</ProfileInfoDialog>
