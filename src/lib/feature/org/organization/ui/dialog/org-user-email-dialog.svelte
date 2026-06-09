<script lang="ts">
  import ProfileInfoDialog from "../../../../shared/user/ui/dialog/profile-info-dialog.svelte";
  import { Mail01Icon } from "@hugeicons/core-free-icons";
  import {
    UpdateDataFielEnum,
    UpdateDataTypeEnum,
    type OrgOrganizationProfile,
  } from "$lib/feature/org/organization/data/model/organization";
  import SendOtpDialog from "$lib/feature/shared/user/ui/dialog/send-otp-dialog.svelte";
  import ConfirmOtpDialog from "$lib/feature/shared/user/ui/dialog/confirm-otp-dialog.svelte";
  import { UserUpdateDataService } from "$lib/feature/shared/user/data/service/user-update-data.service";
  import { useUserSendMessageEmail } from "$lib/feature/shared/user/data/hooks/use-user-send-message-email";
  import { useUserUpdateDataReset } from "$lib/feature/shared/user/data/hooks/use-user-update-data-reset";
  import { useCountdown } from "$lib/hooks/use-countdown.svelte";

  let {
    value,
  }: {
    value: OrgOrganizationProfile;
    icon?: any;
    onSubmit?: (value: string) => void;
  } = $props();

  const service = new UserUpdateDataService();
  let mutateUserSendMessageEmail = useUserSendMessageEmail({ service });
  let mutateUserUpdateDataReset = useUserUpdateDataReset({ service });

  const onSendOtp = async (email: string) => {
    if (isLoading) return;
    await $mutateUserSendMessageEmail.mutateAsync({ input: email });
  };

  const onConfirmOtp = async (otp: string) => {
    if (isLoading) return;
    await $mutateUserUpdateDataReset.mutateAsync({
      id: updateDataResponse!.id,
      otp,
    });
  };

  let isLoading = $derived(
    $mutateUserSendMessageEmail.isLoading ||
      $mutateUserUpdateDataReset.isLoading,
  );

  let updateDataResponse = $derived(
    value.updateDataResponse.find(
      (item) =>
        item.field == UpdateDataFielEnum.EMAIL &&
        item.type == UpdateDataTypeEnum.USER,
    ),
  );

  const countdown = useCountdown(() => updateDataResponse?.expiredAt);
</script>

<ProfileInfoDialog
  label="Insira o seu email"
  type="email"
  subLabel="Para alterar o email, irás receber o código de verificação no novo email."
  value={value.user.email}
  icon={Mail01Icon}
  expiredAt={updateDataResponse?.expiredAt}
>
  {#if updateDataResponse && !countdown.isExpired}
    <ConfirmOtpDialog
      title="Confirmar Email"
      description="Insira o código de verificação que foi enviado para o seu email."
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
      value={value.user.email}
      {onSendOtp}
      {isLoading}
    />
  {/if}
</ProfileInfoDialog>
