<script lang="ts">
  import UserUpdateDataOtpDialog from "./user-update-data-otp-dialog.svelte";
  import ProfileInfoDialog from "./profile-info-dialog.svelte";
  import { SmartPhone02Icon } from "@hugeicons/core-free-icons";
  import { UserUpdateDataService } from "../../data/service/user-update-data.service";
  import { useUserSendMessagePhone } from "../../data/hooks/use-user-send-message-phone";

  let {
    value,
  }: {
    value: string | null | undefined;
  } = $props();

  const service = new UserUpdateDataService();
  const sendPhoneMutation = useUserSendMessagePhone({ service });
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
  <UserUpdateDataOtpDialog
    icon={SmartPhone02Icon}
    title="Atualizar telefone"
    description="Insira o novo telefone para receber o código de verificação."
    label="Telefone"
    {value}
  />
</ProfileInfoDialog>
