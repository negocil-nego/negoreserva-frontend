<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import InputIcon from "$lib/components/ui/input-icon/input-icon.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  let emailOrPhone: string = $state("");
  let {
    title,
    description,
    label,
    icon,
    value,
    isLoading,
    onSendOtp,
  }: {
    title: string;
    description: string;
    label: string;
    icon: any;
    value: string | null | undefined;
    isLoading: boolean;
    onSendOtp: (value: string) => void;
  } = $props();
</script>

<Dialog.Root>
  <Dialog.Trigger
    class={buttonVariants({
      variant: "ghost",
      class:
        "flex items-center justify-start pl-0 mr-0 sm:pl-auto sm:justify-end gap-1 cursor-pointer text-sm sm:col-start-4 text-blue-800 dark:text-blue-200 sm:-mr-5",
    })}
  >
    <HugeiconsIcon
      icon={PencilEdit02Icon}
      size={15}
      color="currentColor"
      strokeWidth={1}
    />
    Editar
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
        <InputIcon
          bind:value={emailOrPhone}
          placeholder={value}
          class="md:p-5 text-sm"
        >
          {#snippet preffix()}
            <HugeiconsIcon
              {icon}
              size={20}
              color="currentColor"
              strokeWidth={1}
            />
          {/snippet}
        </InputIcon>
      </div>
    </div>
    <Dialog.Footer class="sm:justify-start">
      <Dialog.Close class={buttonVariants({ variant: "secondary" })}>
        Cancelar
      </Dialog.Close>
      <Button
        class="bg-brand"
        onclick={() => onSendOtp(emailOrPhone)}
        disabled={isLoading}
      >
        Confirmar
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
