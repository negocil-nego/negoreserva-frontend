<script lang="ts">
  import AuthPanel from "$lib/feature/pub/auth/auth-panel.svelte";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import RegisterOptionsDrawer from "$lib/feature/pub/auth/register/ui/register-options-drawer.svelte";
  import LoginForm from "$lib/feature/pub/auth/login/ui/login-form.svelte";
  import {PHOTO_SIGNING_STEP1, PHOTO_SIGNING_STEP2} from "$lib/data/variables";

  const items = [
    {
      title: "Bem-vindo à plataforma Negócios, Reservas e Encomendas",
      image: PHOTO_SIGNING_STEP1,
      description:
        "Aceda a uma plataforma que centraliza a gestão do seu negócio de forma simples e eficiente. Controle reservas, encomendas e operações num só lugar, com segurança e praticidade no seu dia a dia.",
    },
    {
      title: "Desfrute da experiência Negócios, Reservas e Encomendas",
      image: PHOTO_SIGNING_STEP2,
      description:
        "Gerencie reservas e encomendas em tempo real com uma visão clara do seu negócio. Tome decisões melhores com ferramentas intuitivas e melhore a qualidade do seu serviço.",
    },
  ];
</script>

<AuthPanel {items}>
  {#snippet controls()}
    <DropdownTheme />
    <RegisterOptionsDrawer isLabel/>
  {/snippet}
  {#snippet form()}
    <LoginForm />
  {/snippet}
</AuthPanel>
