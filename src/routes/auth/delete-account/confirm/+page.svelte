<script lang="ts">
  import AuthPanel from "$lib/feature/pub/auth/auth-panel.svelte";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import DeleteAccountConfirmForm from "$lib/feature/pub/auth/delete-account/ui/delete-account-confirm-form.svelte";

  const items = [
    {
      title: "Confirmar eliminação",
      image: "/img/forget-password/img1.png",
      description:
        "Este passo protege a sua conta contra pedidos indevidos. Confirme o código recebido e a senha atual antes do tempo expirar.",
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
        <DeleteAccountConfirmForm />
      </div>
    </div>
  {/snippet}
</AuthPanel>
