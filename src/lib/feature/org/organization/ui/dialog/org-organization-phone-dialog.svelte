<script lang="ts">
  import { SmartPhone02Icon } from "@hugeicons/core-free-icons";
  import {
    UpdateDataFielEnum,
    UpdateDataTypeEnum,
    type OrgOrganizationProfile,
  } from "$lib/feature/org/organization/data/model/organization";
  import SendOtpDialog from "$lib/feature/shared/user/ui/dialog/send-otp-dialog.svelte";
  import ConfirmOtpDialog from "$lib/feature/shared/user/ui/dialog/confirm-otp-dialog.svelte";
  import { OrgOrganizationUpdateDataService } from "../../data/service/organization-update-data.service";
  import { useOrganizationSendMessagePhone } from "../../data/hooks/use-organization-send-message-phone";
  import { useOrgUpdateDataReset } from "../../data/hooks/use-org-update-data-reset";
  import { useCountdown } from "$lib/hooks/use-countdown.svelte";
  import ProfileInfoDialog from "$lib/feature/shared/user/ui/dialog/profile-info-dialog.svelte";

  let {
    value,
  }: {
    value: OrgOrganizationProfile;
  } = $props();

  const service = new OrgOrganizationUpdateDataService();
  let mutateSendPhone = useOrganizationSendMessagePhone({ service });
  let mutateUpdateData = useOrgUpdateDataReset({ service });

  const onSendOtp = async (phone: string) => {
    if (isLoading) return;
    await $mutateSendPhone.mutateAsync({ input: phone });
  };

  const onConfirmOtp = async (otp: string) => {
    if (isLoading) return;
    await $mutateUpdateData.mutateAsync({
      id: updateDataResponse!.id,
      otp,
    });
  };

  let isLoading = $derived(
    $mutateSendPhone.isLoading || $mutateUpdateData.isLoading,
  );

  let updateDataResponse = $derived(
    value.updateDataResponse.find(
      (item) =>
        item.field == UpdateDataFielEnum.PHONE &&
        item.type == UpdateDataTypeEnum.ORGANIZATION,
    ),
  );

  const countdown = useCountdown(() => updateDataResponse?.expiredAt);
</script>

<ProfileInfoDialog
  label="Insira o telefone da organização"
  type="text"
  subLabel="Para alterar o telefone, irás receber o código de verificação no novo telefone."
  value={value.organization.phone}
  icon={SmartPhone02Icon}
  expiredAt={updateDataResponse?.expiredAt}
>
  {#if updateDataResponse}
    <ConfirmOtpDialog
      title="Confirmar Telefone"
      description="Insira o código de verificação que foi enviado para o novo telefone."
      label="Telefone"
      {onConfirmOtp}
      {isLoading}
      isExpired={countdown.isExpired}
    />
  {:else}
    <SendOtpDialog
      title="Atualizar Telefone"
      description="Insira o novo telefone para receber o código de verificação."
      label="Telefone"
      icon={SmartPhone02Icon}
      value={value.organization.phone}
      {onSendOtp}
      {isLoading}
    />
  {/if}
</ProfileInfoDialog>
