<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import InputIcon from "$lib/components/ui/input-icon/input-icon.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { UserUpdateDataService } from "../../data/service/user-update-data.service";
  import { useUserUpdateDataReset } from "../../data/hooks/use-user-update-data-reset";

  let emailOrPhone: string = $state("");
  let otpCode: string = $state("");
  let dataChangeId: string = $state("");

  let {
    title,
    description,
    label,
    icon,
    value,
  }: {
    title: string;
    description: string;
    label: string;
    icon: any;
    value: string | null | undefined;
  } = $props();

  const service = new UserUpdateDataService();
  const updateDataMutation = useUserUpdateDataReset({ service });
  let isLoading = $derived($updateDataMutation.isLoading);

  const handleConfirm = async () => {
    if (isLoading || !dataChangeId || !otpCode) return;
    await $updateDataMutation.mutateAsync({
      id: dataChangeId,
      otp: otpCode,
    });
  };
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
    <div class="flex items-center gap-2 mt-4">
      <div class="grid flex-1 gap-2">
        <Label for="otp">Código de verificação</Label>
        <input
          bind:value={otpCode}
          placeholder="Insira o código OTP"
          class="rounded-xl md:p-3 text-sm bg-input/30 w-full"
        />
      </div>
    </div>
    <Dialog.Footer class="sm:justify-start">
      <Dialog.Close class={buttonVariants({ variant: "secondary" })}>
        Cancelar
      </Dialog.Close>
      <Button class="bg-brand" onclick={handleConfirm} disabled={isLoading}>
        {isLoading ? "A atualizar..." : "Confirmar"}
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
