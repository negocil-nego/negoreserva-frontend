<script lang="ts">
  import AuthPanel from "$lib/feature/pub/auth/auth-panel.svelte";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import ForgetPasswordForm from "$lib/feature/pub/auth/forget-password/ui/forget-password-form.svelte";

  const items = [
    {
      title: "Recupere o acesso à sua conta",
      image: "/img/forget-password/img1.png",
      description:
        "Não se preocupe, acontece com todos! Introduza o seu email ou número de telefone associado à sua conta e nós tratamos do resto. Enviaremos um código de verificação seguro para que possa redefinir a sua senha de forma rápida e sem complicações.",
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
        <ForgetPasswordForm />
      </div>
    </div>
  {/snippet}
</AuthPanel>
