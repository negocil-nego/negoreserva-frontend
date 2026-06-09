<script lang="ts">
  import AuthPanel from "$lib/feature/pub/auth/auth-panel.svelte";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import ResetPasswordForm from "$lib/feature/pub/auth/reset-password/ui/reset-password-form.svelte";

  const items = [
    {
      title: "Resetar senha",
      image: "/img/forget-password/img1.png",
      description:
        "Enviaremos um código de verificação seguro para que possa redefinir a sua senha de forma rápida e sem complicações.",
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
        <ResetPasswordForm />
      </div>
    </div>
  {/snippet}
</AuthPanel>
