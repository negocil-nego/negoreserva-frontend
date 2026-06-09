<script lang="ts">
  import AuthPanel from "$lib/feature/pub/auth/auth-panel.svelte";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import OtpForm from "$lib/feature/pub/auth/otp/otp-form.svelte";

  const items = [
    {
      title: "Verifique a sua identidade",
      image: "/img/signin/img1.png",
      description:
        "Para garantir a segurança da sua conta, enviamos um código de verificação único para o seu telefone. Este código é válido por tempo limitado. Insira-o abaixo para concluir o seu cadastro e ter acesso completo à plataforma.",
    },
  ];
</script>

<AuthPanel {items}>
  {#snippet controls()}
    <DropdownTheme />
  {/snippet}
  {#snippet form()}
    <div
      class="bg-background flex flex-col items-center justify-center gap-6 p-6 md:p-10"
    >
      <div class="w-full max-w-sm">
        <OtpForm />
      </div>
    </div>
  {/snippet}
</AuthPanel>
