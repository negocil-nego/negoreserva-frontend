<script lang="ts">
  import AuthPanel from "$lib/feature/pub/auth/auth-panel.svelte";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import DeleteAccountRequestForm from "$lib/feature/pub/auth/delete-account/ui/delete-account-request-form.svelte";

  const items = [
    {
      title: "Eliminar conta",
      image: "/img/forget-password/img1.png",
      description:
        "Antes de eliminar a conta, confirmamos que o pedido pertence realmente ao titular. Introduza o email ou telefone associado para receber um código de verificação.",
    },
  ];
</script>

<AuthPanel {items}>
  {#snippet controls()}
    <DropdownTheme />
  {/snippet}
  {#snippet form()}
    <div class="flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div class="w-full max-w-sm">
        <DeleteAccountRequestForm />
      </div>
    </div>
  {/snippet}
</AuthPanel>
