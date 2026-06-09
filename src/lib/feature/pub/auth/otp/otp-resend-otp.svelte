<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { useResendOtp } from "../register/data/hooks/use-resend-otp";
  import { RegisterService } from "../register/data/service/register.service";
  import {
    isOtpExpired,
    registerStore,
  } from "../../../../stores/register.store";

  const service = new RegisterService();
  const resentMutation = useResendOtp({ service });

  let isLoading = $derived($resentMutation.isLoading);

  const handleResendOtp = async () => {
    const data = registerStore.getAccountResponse();
    if (!data?.otpId || !data?.userId) return;
    await $resentMutation.mutateAsync({
      otpId: data.otpId,
      userId: data.userId,
    });
  };
</script>

<div class="flex justify-center items-center">
  {#if $isOtpExpired}
    <div>Código expirado?</div>
  {:else}
    <div>Não recebeu o código?</div>
  {/if}
  <Button
    disabled={$isOtpExpired || isLoading}
    onclick={handleResendOtp}
    variant="link"
    class="underline cursor-pointer"
  >
    Reenviar código
  </Button>
</div>
