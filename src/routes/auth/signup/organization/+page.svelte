<script lang="ts">
  import AuthPanel from "$lib/feature/pub/auth/auth-panel.svelte";
  import LoginNavigationButton from "$lib/components/navs/login-navigation-button.svelte";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
  import AuthBreadcrumb from "$lib/feature/pub/auth/register/ui/auth-breadcrumb.svelte";
  import SignupOrganizationForm from "$lib/feature/pub/auth/register/ui/signup-organization-form.svelte";
  import {
    PHOTO_SIGNUP_ORGANIZATION_STEP1,
    PHOTO_SIGNUP_ORGANIZATION_STEP2,
    PHOTO_SIGNUP_ORGANIZATION_STEP3
  } from "$lib/data/variables";

  const items = [
    {
      title: "Hotelaria e Turismo",
      image: PHOTO_SIGNUP_ORGANIZATION_STEP1,
      description:
        "Eleve a experiência dos seus hóspedes a outro nível. Gerencie reservas, check-ins, check-outs e disponibilidade de quartos em tempo real, tudo numa plataforma intuitiva e acessível de qualquer dispositivo.",
    },
    {
      title: "Restaurantes",
      image: PHOTO_SIGNUP_ORGANIZATION_STEP2,
      description:
        "Diga adeus às filas e à confusão de reservas em papel. Organize mesas, horários e fluxo de clientes com facilidade, garantindo uma experiência gastronómica memorável do início ao fim.",
    },
    {
      title: "Cardápio Eletrônico",
      image: PHOTO_SIGNUP_ORGANIZATION_STEP3,
      description:
        "Modernize o seu estabelecimento com cardápios digitais interativos. Atualize preços, itens e promoções em segundos, sem custos de impressão, e ofereça aos seus clientes uma experiência de pedido mais ágil e sofisticada.",
    },
  ];
</script>

<AuthPanel {items}>
  {#snippet controls()}
    <DropdownTheme />
    <LoginNavigationButton isLabel/>
  {/snippet}
  {#snippet breadcrumb()}
    <AuthBreadcrumb title="Organização" />
  {/snippet}
  {#snippet form()}
    <SignupOrganizationForm />
  {/snippet}
</AuthPanel>
