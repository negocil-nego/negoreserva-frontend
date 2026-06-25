<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    PHOTO_SIGNING_STEP1,
    PHOTO_SIGNING_STEP2,
    PHOTO_SIGNUP_CLIENT_STEP1,
    PHOTO_SIGNUP_CLIENT_STEP2,
    PHOTO_SIGNUP_CLIENT_STEP3,
    PHOTO_SIGNUP_ORGANIZATION_STEP1,
    PHOTO_SIGNUP_ORGANIZATION_STEP2,
    PHOTO_SIGNUP_ORGANIZATION_STEP3,
  } from "$lib/data/variables";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    Analytics01Icon,
    ArrowRight01Icon,
    BookOpen01Icon,
    Briefcase01Icon,
    CheckmarkCircle01Icon,
    CloudUploadIcon,
    CustomerSupportIcon,
    FingerPrintIcon,
    InstagramIcon,
    Location01Icon,
    Mail01Icon,
    Rocket01Icon,
    SecurityCheckIcon,
    TelephoneIcon,
    UserGroupIcon,
  } from "@hugeicons/core-free-icons";
    import HeroGallery from "$lib/components/hero-gallery.svelte";

  const values = [
    {
      icon: Rocket01Icon,
      title: "Pensar em escala local",
      description:
        "Criamos ferramentas para negócios que querem crescer sem perder proximidade com os seus clientes.",
    },
    {
      icon: SecurityCheckIcon,
      title: "Assumir responsabilidade",
      description:
        "Reservas, pagamentos e dados sensíveis exigem clareza, rastreabilidade e decisões cuidadosas.",
    },
    {
      icon: UserGroupIcon,
      title: "Apoiar quem opera",
      description:
        "A plataforma deve ajudar equipas reais, em dias reais, com fluxos simples de acompanhar.",
    },
    {
      icon: BookOpen01Icon,
      title: "Aprender com o mercado",
      description:
        "Cada hotel, restaurante, prestador e cliente ensina algo sobre como melhorar o produto.",
    },
    {
      icon: Analytics01Icon,
      title: "Partilhar contexto",
      description:
        "Boas decisões nascem quando a informação certa chega à pessoa certa no momento certo.",
    },
    {
      icon: CheckmarkCircle01Icon,
      title: "Fazer bem o essencial",
      description:
        "Antes de adicionar ruído, protegemos o básico: encontrar, reservar, confirmar e acompanhar.",
    },
  ];

  const resources = [
    {
      icon: CloudUploadIcon,
      title: "Publicação rápida",
      description:
        "Organizações podem apresentar serviços, catálogos e imagens sem depender de processos longos.",
    },
    {
      icon: Briefcase01Icon,
      title: "Catálogos de serviço",
      description:
        "Produtos e ofertas ficam organizados para que o cliente entenda preço, detalhe e disponibilidade.",
    },
    {
      icon: ArrowRight01Icon,
      title: "Fluxos simples",
      description:
        "Da descoberta à reserva, a experiência mantém o utilizador orientado e com menos fricção.",
    },
    {
      icon: FingerPrintIcon,
      title: "Segurança avançada",
      description:
        "OTP, confirmações e proteção de dados sensíveis acompanham os principais pontos da conta.",
    },
  ];

  const team = [
    { name: "Aline Mateus", role: "Produto e Experiência", location: "Luanda, Angola", image: PHOTO_SIGNUP_CLIENT_STEP1 },
    { name: "Mauro Domingos", role: "Engenharia Backend", location: "Huambo, Angola", image: PHOTO_SIGNING_STEP1 },
    { name: "Carla Venâncio", role: "Operações Comerciais", location: "Benguela, Angola", image: PHOTO_SIGNUP_ORGANIZATION_STEP1 },
    { name: "Nelson Paulo", role: "Suporte ao Cliente", location: "Luanda, Angola", image: PHOTO_SIGNING_STEP2 },
    { name: "Sofia Mendes", role: "Design de Interface", location: "Lubango, Angola", image: PHOTO_SIGNUP_CLIENT_STEP2 },
    { name: "Edson Canga", role: "Pagamentos e Integrações", location: "Luanda, Angola", image: PHOTO_SIGNUP_ORGANIZATION_STEP2 },
    { name: "Helena Costa", role: "Conteúdo e Comunidade", location: "Malanje, Angola", image: PHOTO_SIGNUP_CLIENT_STEP3 },
    { name: "Rui Baptista", role: "Qualidade e Dados", location: "Cabinda, Angola", image: PHOTO_SIGNUP_ORGANIZATION_STEP3 },
  ];

  const supportImage = "/img/forget-password/img1.png";

  const benefits = [
    "Remuneração competitiva",
    "Horários flexíveis",
    "Aprendizagem contínua",
    "Encontros de equipa",
    "Benefícios para si e família",
    "Ambiente de trabalho saudável",
  ];

  const footerGroups = [
    {
      title: "Soluções",
      links: ["Reservas", "Catálogos", "Pagamentos", "Organizações", "Relatórios"],
    },
    {
      title: "Suporte",
      links: ["Enviar pedido", "Documentação", "Guias", "Central de ajuda"],
    },
    {
      title: "Empresa",
      links: ["Sobre", "Blog", "Carreiras", "Contacto"],
    },
    {
      title: "Legal",
      links: ["Termos de serviço", "Política de privacidade", "Eliminação de conta"],
    },
  ];
</script>

<svelte:head>
  <title>Negoreserva | Sobre a Plataforma</title>
  <meta
    name="description"
    content="Conheça a Negoreserva, uma plataforma angolana para reservas, catálogos, suporte e gestão de serviços."
  />
</svelte:head>

<div class="bg-background text-foreground">
  <header class="bg-brand relative overflow-hidden">
    <div class="absolute inset-0 site-grid"></div>
    <div class="absolute bottom-0 right-0 h-80 w-80 bg-white/15 blur-3xl"></div>
    <nav class="container relative z-10 flex items-center justify-between py-6">
      <a href={resolve("/")} class="flex items-center gap-2 text-xl font-extrabold">
        <span class="text-green-400">NEGO</span><span>RESERVA</span>
      </a>
      <div class="hidden items-center gap-10 text-sm font-bold text-white/85 md:flex">
        <a href="#produto" class="hover:text-green-100">Produto</a>
        <a href="#valores" class="hover:text-green-100">Valores</a>
        <a href="#recursos" class="hover:text-green-100">Recursos</a>
        <a href="#equipa" class="hover:text-green-100">Equipa</a>
      </div>
      <a href={resolve("/auth/signin")} class="text-sm font-bold hover:text-green-100">
        Entrar →
      </a>
    </nav>

    <section id="produto" class="container relative z-10 grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="h-full">
        <h1 class="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight">
          Estamos a mudar a forma como pessoas encontram e reservam serviços.
        </h1>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-white/85">
          A Negoreserva aproxima clientes de hotéis, restaurantes, experiências e prestadores locais com uma jornada clara: descobrir, comparar, reservar, pagar e acompanhar sem perder confiança.
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={resolve("/")} class="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-bold text-green-800 shadow-sm">
            Explorar agora
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} color="currentColor" strokeWidth={1.8} />
          </a>
          <a href="#recursos" class="inline-flex items-center justify-center border border-white/35 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
            Ver recursos
          </a>
        </div>
      </div>
      <div class="relative hidden h-full lg:flex">
        <HeroGallery />
      </div>
    </section>
  </header>

  <main>
    <section id="valores" class="bg-background py-20">
      <div class="container">
        <h2 class="text-4xl font-extrabold tracking-tight">Os nossos valores</h2>
        <p class="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
          Construímos uma plataforma para negócios que precisam de presença digital, mas também de organização, confiança e acompanhamento operacional.
        </p>
        <div class="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {#each values as value (value.title)}
            <article class="flex gap-4">
              <HugeiconsIcon icon={value.icon} size={20} color="#15803d" strokeWidth={1.8} />
              <div>
                <h3 class="font-extrabold">{value.title}</h3>
                <p class="mt-2 text-sm leading-7 text-muted-foreground">{value.description}</p>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <section id="recursos" class="bg-panel py-20">
      <div class="container bg-background px-6 py-20 shadow-sm md:px-14">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-extrabold text-green-700">Publicar melhor</p>
          <h2 class="mt-4 text-4xl font-extrabold tracking-tight">
            Tudo o que precisa para colocar serviços online com confiança.
          </h2>
          <p class="mt-6 text-base leading-8 text-muted-foreground">
            A Negoreserva junta catálogo, visibilidade, segurança e suporte para reduzir o espaço entre interesse e reserva confirmada.
          </p>
        </div>
        <div class="mx-auto mt-16 grid max-w-4xl gap-x-20 gap-y-12 md:grid-cols-2">
          {#each resources as resource (resource.title)}
            <article class="flex gap-5">
              <span class="bg-brand inline-flex h-10 w-10 shrink-0 items-center justify-center text-white">
                <HugeiconsIcon icon={resource.icon} size={20} color="currentColor" strokeWidth={1.8} />
              </span>
              <div>
                <h3 class="font-extrabold">{resource.title}</h3>
                <p class="mt-3 text-sm leading-7 text-muted-foreground">{resource.description}</p>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <section id="equipa" class="bg-background py-20">
      <div class="container">
        <h2 class="text-4xl font-extrabold tracking-tight">A nossa equipa</h2>
        <p class="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
          Somos uma equipa multidisciplinar que combina produto, engenharia, suporte e operação para entregar uma plataforma útil a clientes e prestadores.
        </p>
        <div class="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {#each team as person (person.name)}
            <article>
              <div class="h-48 overflow-hidden p-2">
                <img src={person.image} alt={person.name} class="size-full object-cover" />
              </div>
              <div class="-mt-10 ml-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl font-extrabold text-white">
                {person.name.slice(0, 1)}
              </div>
              <h3 class="mt-5 font-extrabold">{person.name}</h3>
              <p class="mt-1 text-sm font-semibold text-muted-foreground">{person.role}</p>
              <p class="mt-1 text-sm text-muted-foreground/80">{person.location}</p>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <section class="bg-panel py-16">
      <div class="container bg-background p-8 shadow-sm md:p-14">
        <div class="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div class="h-72 overflow-hidden p-3">
            <img src={PHOTO_SIGNUP_ORGANIZATION_STEP3} alt="Equipa a construir soluções digitais" class="size-full object-cover" />
          </div>
          <div>
            <h2 class="text-4xl font-extrabold tracking-tight">Junte-se à equipa</h2>
            <p class="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
              Procuramos pessoas que queiram construir soluções para problemas reais de reserva, atendimento, pagamentos e operação local.
            </p>
            <div class="mt-8 grid gap-4 sm:grid-cols-2">
              {#each benefits as benefit (benefit)}
                <div class="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} color="#15803d" strokeWidth={2} />
                  {benefit}
                </div>
              {/each}
            </div>
            <a href="mailto:suporte@negoreserva.ao?subject=Quero%20juntar-me%20%C3%A0%20equipa" class="mt-9 inline-flex items-center gap-2 text-sm font-extrabold text-green-700">
              Ver oportunidades →
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-background py-16">
      <div class="container overflow-hidden bg-panel shadow-sm">
        <div class="grid lg:grid-cols-2">
          <div class="bg-brand site-grid min-h-[520px] p-8 md:p-12">
            <div class="h-44 overflow-hidden bg-white/20 p-2">
              <img src={supportImage} alt="Suporte da Negoreserva" class="size-full object-cover" />
            </div>
            <div class="mt-8 bg-white/95 p-6 text-green-950 shadow-sm">
              <h2 class="text-4xl font-extrabold tracking-tight">Fale connosco</h2>
              <p class="mt-6 max-w-md text-base leading-8 text-green-900/80">
                Quer colocar a sua organização na Negoreserva, esclarecer uma dúvida ou conversar sobre parceria? A equipa responde com contexto.
              </p>
              <div class="mt-10 space-y-5 text-sm font-semibold text-green-950">
                <div class="flex gap-4">
                  <HugeiconsIcon icon={Location01Icon} size={20} color="currentColor" strokeWidth={1.6} />
                  <span>Luanda, Angola</span>
                </div>
                <div class="flex gap-4">
                  <HugeiconsIcon icon={TelephoneIcon} size={20} color="currentColor" strokeWidth={1.6} />
                  <span>+244 900 000 000</span>
                </div>
                <div class="flex gap-4">
                  <HugeiconsIcon icon={Mail01Icon} size={20} color="currentColor" strokeWidth={1.6} />
                  <span>suporte@negoreserva.ao</span>
                </div>
              </div>
            </div>
          </div>
          <form class="space-y-6 p-8 md:p-12">
            <div class="grid gap-6 sm:grid-cols-2">
              <label class="space-y-2 text-sm font-bold">
                Nome
                <input class="w-full bg-background text-foreground" />
              </label>
              <label class="space-y-2 text-sm font-bold">
                Sobrenome
                <input class="w-full bg-background text-foreground" />
              </label>
            </div>
            <label class="block space-y-2 text-sm font-bold">
              Email
              <input type="email" class="w-full bg-background text-foreground" />
            </label>
            <label class="block space-y-2 text-sm font-bold">
              Telefone
              <input class="w-full bg-background text-foreground" />
            </label>
            <label class="block space-y-2 text-sm font-bold">
              Mensagem
              <textarea rows="5" class="w-full bg-background text-foreground"></textarea>
            </label>
            <div class="flex justify-end">
              <button type="button" class="bg-brand px-5 py-3 text-sm font-extrabold text-white">
                Enviar mensagem
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer class="bg-panel py-16">
    <div class="container">
      <div class="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <div class="text-2xl font-extrabold">
            <span class="text-green-400">NEGO</span><span>RESERVA</span>
          </div>
          <p class="mt-6 max-w-xs text-sm leading-7 text-muted-foreground">
            Tornamos reservas, catálogos e serviços digitais mais claros para negócios e clientes.
          </p>
          <div class="mt-7 flex gap-5 text-muted-foreground">
            <HugeiconsIcon icon={InstagramIcon} size={20} color="currentColor" strokeWidth={1.6} />
            <HugeiconsIcon icon={CustomerSupportIcon} size={20} color="currentColor" strokeWidth={1.6} />
            <HugeiconsIcon icon={Mail01Icon} size={20} color="currentColor" strokeWidth={1.6} />
          </div>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {#each footerGroups as group (group.title)}
            <div>
              <h3 class="text-sm font-extrabold">{group.title}</h3>
              <ul class="mt-6 space-y-4 text-sm text-muted-foreground">
                {#each group.links as link (link)}
                  <li>{link}</li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
      <div class="mt-16 border-t pt-8 text-sm text-muted-foreground">
        © 2026 Negoreserva. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</div>

<style>
  .site-grid {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
    background-size: 150px 150px;
  }

  :global(body) {
    overflow-x: hidden;
  }
</style>
