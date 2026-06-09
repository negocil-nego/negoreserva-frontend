<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  let otpCode: string = $state("");
  let {
    title,
    description,
    label,
    onConfirmOtp,
    isLoading,
    isExpired = false,
  }: {
    title: string;
    description: string;
    label: string;
    onConfirmOtp: (otp: string) => void;
    isLoading: boolean;
    isExpired?: boolean;
  } = $props();
</script>

<Dialog.Root>
  <Dialog.Trigger
    class={buttonVariants({
      variant: "ghost",
      class:
        "flex items-center justify-end gap-1 cursor-pointer text-sm sm:col-start-4 text-blue-800 dark:text-blue-200 -mr-5",
    })}
  >
    <HugeiconsIcon
      icon={PencilEdit02Icon}
      size={15}
      color="currentColor"
      strokeWidth={1}
    />
    Confirmar otp
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>
        {description}
      </Dialog.Description>
    </Dialog.Header>
    <div class="flex items-center gap-2">
      <div class="grid flex-1 gap-2">
        <Label for="link" class="sr-only">{label}</Label>
        <InputOTP.Root
          maxlength={6}
          id="otp"
          required
          class="gap-4"
          bind:value={otpCode}
          disabled={isLoading || isExpired}
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
      </div>
    </div>
    <Dialog.Footer class="sm:justify-start">
      <Dialog.Close class={buttonVariants({ variant: "secondary" })}>
        Cancelar
      </Dialog.Close>
      <Button
        class="bg-brand"
        onclick={() => onConfirmOtp(otpCode)}
        disabled={isExpired}
      >
        Confirmar
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
