<script lang="ts">
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import AuthPanel from "$lib/feature/pub/auth/auth-panel.svelte";
  import LoginNavigationButton from "$lib/components/navs/login-navigation-button.svelte";
  import AuthBreadcrumb from "$lib/feature/pub/auth/register/ui/auth-breadcrumb.svelte";
  import SignupClientForm from "$lib/feature/pub/auth/register/ui/signup-client-form.svelte";
  import {PHOTO_SIGNUP_CLIENT_STEP1, PHOTO_SIGNUP_CLIENT_STEP2, PHOTO_SIGNUP_CLIENT_STEP3} from "$lib/data/variables";

  const items = [
    {
      title: "Reserve hotéis, hospedarias e alojamentos",
      image: PHOTO_SIGNUP_CLIENT_STEP1,
      description:
        "Encontre e reserve o alojamento perfeito para cada ocasião. Compare disponibilidade, preços e comodidades em tempo real, com confirmação instantânea e total segurança na sua reserva.",
    },
    {
      title: "Reserve mesas nos melhores restaurantes",
      image: PHOTO_SIGNUP_CLIENT_STEP2,
      description:
        "Garanta o seu lugar nos restaurantes favoritos sem espera e sem complicações. Escolha o horário, o número de pessoas e receba a confirmação diretamente no seu dispositivo.",
    },
    {
      title: "Peça o seu fastfood favorito com facilidade",
      image: PHOTO_SIGNUP_CLIENT_STEP3,
      description:
        "Navegue pelos cardápios digitais, personalize o seu pedido e acompanhe a encomenda em tempo real. Comida rápida, prática e entregue do jeito que você gosta.",
    },
  ];
</script>

<AuthPanel {items}>
  {#snippet controls()}
    <DropdownTheme />
    <LoginNavigationButton isLabel/>
  {/snippet}
  {#snippet breadcrumb()}
    <AuthBreadcrumb title="Cliente" />
  {/snippet}
  {#snippet form()}
    <SignupClientForm />
  {/snippet}
</AuthPanel>
