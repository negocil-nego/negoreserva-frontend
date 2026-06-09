<script lang="ts">
  import { SmartPhone02Icon } from "@hugeicons/core-free-icons";
  import {
    UpdateDataFielEnum,
    UpdateDataTypeEnum,
    type OrgOrganizationProfile,
  } from "$lib/feature/org/organization/data/model/organization";
  import ProfileInfoDialog from "$lib/feature/shared/user/ui/dialog/profile-info-dialog.svelte";
  import SendOtpDialog from "$lib/feature/shared/user/ui/dialog/send-otp-dialog.svelte";
  import ConfirmOtpDialog from "$lib/feature/shared/user/ui/dialog/confirm-otp-dialog.svelte";
  import { UserUpdateDataService } from "$lib/feature/shared/user/data/service/user-update-data.service";
  import { useUserUpdateDataReset } from "$lib/feature/shared/user/data/hooks/use-user-update-data-reset";
  import { useUserSendMessagePhone } from "$lib/feature/shared/user/data/hooks/use-user-send-message-phone";
  import { useCountdown } from "$lib/hooks/use-countdown.svelte";

  let {
    value,
  }: {
    value: OrgOrganizationProfile;
    icon?: any;
    onSubmit?: (value: string) => void;
  } = $props();

  const service = new UserUpdateDataService();
  let mutateUserSendMessagePhone = useUserSendMessagePhone({ service });
  let mutateUserUpdateDataReset = useUserUpdateDataReset({ service });

  const onSendOtp = async (phone: string) => {
    if (isLoading) return;
    await $mutateUserSendMessagePhone.mutateAsync({ input: phone });
  };

  const onConfirmOtp = async (otp: string) => {
    if (isLoading) return;
    await $mutateUserUpdateDataReset.mutateAsync({
      id: updateDataResponse!.id,
      otp,
    });
  };

  let isLoading = $derived(
    $mutateUserSendMessagePhone.isLoading ||
      $mutateUserUpdateDataReset.isLoading,
  );

  let updateDataResponse = $derived(
    value.updateDataResponse.find(
      (item) =>
        item.field == UpdateDataFielEnum.PHONE &&
        item.type == UpdateDataTypeEnum.USER,
    ),
  );

  const countdown = useCountdown(() => updateDataResponse?.expiredAt);
</script>

<ProfileInfoDialog
  label="Insira o seu telefone"
  type="text"
  subLabel="Para alterar o telefone, irás receber o código de verificação no novo telefone."
  value={value.user.phone}
  icon={SmartPhone02Icon}
  expiredAt={updateDataResponse?.expiredAt}
>
  {#if updateDataResponse}
    <ConfirmOtpDialog
      title="Atualizar Telefone"
      description="Insira o telefone para enviar o código de verificação."
      label="Telefone"
      {onConfirmOtp}
      {isLoading}
      isExpired={countdown.isExpired}
    />
  {:else}
    <SendOtpDialog
      title="Atualizar telefone"
      description="Insira o novo telefone para receber o código de verificação."
      label="Telefone"
      icon={SmartPhone02Icon}
      value={value.user.phone}
      {onSendOtp}
      {isLoading}
    />
  {/if}
</ProfileInfoDialog>
