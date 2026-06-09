<script lang="ts">
  import UserUpdateDataOtpDialog from "./user-update-data-otp-dialog.svelte";
  import ProfileInfoDialog from "./profile-info-dialog.svelte";
  import { Mail01Icon } from "@hugeicons/core-free-icons";
  import { UserUpdateDataService } from "../../data/service/user-update-data.service";
  import { useUserSendMessageEmail } from "../../data/hooks/use-user-send-message-email";

  let {
    value,
  }: {
    value: string | null | undefined;
  } = $props();

  const service = new UserUpdateDataService();
  const sendEmailMutation = useUserSendMessageEmail({ service });
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
  <UserUpdateDataOtpDialog
    icon={Mail01Icon}
    title="Atualizar Email"
    description="Insira o email para enviar o código de verificação."
    label="Email"
    {value}
  />
</ProfileInfoDialog>
