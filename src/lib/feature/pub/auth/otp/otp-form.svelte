<script lang="ts">
  import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
  import type { HTMLAttributes } from "svelte/elements";
  import OtpCountdown from "$lib/feature/pub/auth/otp/otp-countdown.svelte";
  import {
    isOtpExpired,
    registerStore,
  } from "$lib/stores/register.store";
  import OtpResendOtp from "./otp-resend-otp.svelte";
  import { RegisterService } from "../register/data/service/register.service";
  import { useConfirmOtp } from "../register/data/hooks/use-confirm-otp";

  let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> =
    $props();

  const service = new RegisterService();
  const confirmOtpMutation = useConfirmOtp({ service });

  let otpCode = $state("");
  let isLoading = $derived($confirmOtpMutation.isLoading);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (isLoading || $isOtpExpired) return;

    const accountResponse = registerStore.getAccountResponse();
    if (accountResponse?.otpId) {
      $confirmOtpMutation.mutateAsync({
        otpId: accountResponse.otpId,
        code: otpCode,
      });
    }
  };
</script>

<div class={cn("flex flex-col gap-6", className)} {...restProps}>
  <form onsubmit={handleSubmit}>
    <Field.Group>
      <div class="flex flex-col items-center gap-2 text-center">
        <a href="#/" class="flex flex-col items-center gap-2 font-medium">
          <div class="size-8 items-center justify-center rounded-md hidden">
            <GalleryVerticalEndIcon class="size-6" />
          </div>
          <span class="sr-only">NegoReserva</span>
        </a>
        <h1 class="text-xl font-bold">Informe o código de verificação</h1>
        <Field.Description class="text-center">
          Enviamos um código de 6 dígitos para o seu email ou telefone
        </Field.Description>
      </div>
      <Field.Field>
        <Field.Label for="otp" class="sr-only"
          >Código de verificação</Field.Label
        >
        <InputOTP.Root
          maxlength={6}
          id="otp"
          required
          class="gap-4"
          bind:value={otpCode}
          disabled={$isOtpExpired}
        >
          {#snippet children({ cells })}
            <InputOTP.Group
              class="gap-2.5 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-full *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl"
            >
              {#each cells.slice(0, 3) as cell (cell)}
                <InputOTP.Slot {cell} />
              {/each}
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group
              class="gap-2.5 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-full *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl"
            >
              {#each cells.slice(3, 6) as cell (cell)}
                <InputOTP.Slot {cell} />
              {/each}
            </InputOTP.Group>
          {/snippet}
        </InputOTP.Root>
        <Field.Description class="text-center">
          <OtpResendOtp />
        </Field.Description>
      </Field.Field>

      <OtpCountdown />

      <Field.Field>
        <Button
          type="submit"
          class="bg-brand cursor-pointer"
          disabled={$isOtpExpired || isLoading}
        >
          Verificar
        </Button>
      </Field.Field>
    </Field.Group>
  </form>
  <Field.Description class="px-6 text-center">
    Ao clicar em continuar, você concorda com os nossos <a href="#/"
      >Termos de Serviço</a
    >
    e <a href="#/">Política de Privacidade</a>.
  </Field.Description>
</div>
