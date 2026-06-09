<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";

  let {
    title,
    disabled,
    description,
    cancelText,
    actionText,
  }: {
    title?: string;
    disabled?: boolean;
    description?: string;
    cancelText?: string;
    actionText?: string;
  } = $props();
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    {title ?? "Eliminar"}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{title ?? "Confirmação de acção"}</Dialog.Title>
      <Dialog.Description>
        {description ??
          "Esta ação não pode ser desfeita. Isso irá apagar permanentemente sua conta e remover seus dados de nossos servidores."}
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Dialog.Close
        type="button"
        class={buttonVariants({ variant: "outline" })}
        {disabled}
      >
        {cancelText ?? "Cancelar"}
      </Dialog.Close>
      <button
        type="button"
        class={buttonVariants({ variant: "destructive" })}
        {disabled}
      >
        {actionText ?? "Continuar"}
      </button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
