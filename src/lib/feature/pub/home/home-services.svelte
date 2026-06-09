<script lang="ts">
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import {
        Mail01Icon, ChartBarLineIcon, Search01Icon,
        CreditCardIcon, CheckmarkBadge01Icon, MapsLocation01Icon, ArrowRight01Icon
    } from "@hugeicons/core-free-icons";
    import { onMount, onDestroy } from "svelte";

    const services = [
        { icon: Mail01Icon,            animateIn: "animate__fadeInLeft",  title: "Reservas Online",       description: "Reserve hotéis, hospedarias, pensões, restaurantes e experiências turísticas diretamente na plataforma." },
        { icon: ChartBarLineIcon,      animateIn: "animate__fadeInRight", title: "Comparação de Preços",  description: "Compare valores, serviços e opções disponíveis para encontrar a melhor oferta para a sua viagem." },
        { icon: Search01Icon,          animateIn: "animate__fadeInLeft",  title: "Pesquisa Próxima",      description: "Encontre empresas e locais turísticos próximos da sua localização de forma rápida e inteligente." },
        { icon: CreditCardIcon,        animateIn: "animate__fadeInRight", title: "Pagamento Seguro",      description: "Realize pagamentos online com segurança e confirmação imediata da sua reserva." },
        { icon: CheckmarkBadge01Icon,  animateIn: "animate__fadeInLeft",  title: "Empresas Verificadas", description: "Descubra estabelecimentos confiáveis e parceiros verificados em várias regiões do país." },
        { icon: MapsLocation01Icon,    animateIn: "animate__fadeInRight", title: "Turismo Nacional",      description: "Explore destinos turísticos, restaurantes e locais especiais para lazer, descanso e aventura." },
    ];

    const pillars = [
        { label: "Simplicidade",   detail: "Plataforma rápida e intuitiva" },
        { label: "Disponibilidade",detail: "Acessível a qualquer momento" },
        { label: "Segurança",      detail: "As suas informações sempre protegidas" },
        { label: "Portabilidade",  detail: "Website e aplicativo mobile" },
    ];

    let cardRefs: HTMLElement[] = $state([]);
    let observer: IntersectionObserver;

    onMount(() => {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(({ isIntersecting, target }) => {
                if (!isIntersecting) return;
                const el = target as HTMLElement;
                el.classList.remove("opacity-0");
                el.classList.add("animate__animated", el.dataset.animateIn!);
                observer.unobserve(el);
            });
        }, { threshold: 0.15 });

        cardRefs.forEach(el => el && observer.observe(el));
    });

    onDestroy(() => observer?.disconnect());
</script>

<div class="flex w-full flex-col gap-16 lg:flex-row lg:gap-24">

    <div class="flex w-full flex-col gap-8 lg:max-w-1/3 lg:shrink-0">
        <div class="flex flex-col gap-4">
            <h2 class="text-2xl font-extrabold leading-tight lg:text-3xl">O que podes fazer aqui?</h2>
            <p class="text-sm leading-relaxed opacity-60">
                Explora as funcionalidades e serviços que temos nesta plataforma,
                sempre intuitivas e diretas na execução de cada tarefa.
            </p>
        </div>

        <div class="flex flex-col gap-3">
            <p class="text-sm font-semibold opacity-50 uppercase tracking-widest">Os nossos pilares</p>
            <ul class="flex flex-col gap-2">
                {#each pillars as { label, detail }}
                    <li class="flex items-start gap-3">
                        <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
                        <span class="text-sm leading-relaxed">
                            <span class="font-semibold">{label}:</span>
                            <span class="opacity-60"> {detail}</span>
                        </span>
                    </li>
                {/each}
            </ul>
        </div>
    </div>

    <div class="grid w-full grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
        {#each services as { icon, animateIn, title, description }, i}
            <div
                    bind:this={cardRefs[i]}
                    data-animate-in={animateIn}
                    class="group flex flex-col gap-4 opacity-0"
                    style="animation-duration:0.6s; animation-delay:{i * 0.1}s; animation-fill-mode:both;"
            >
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/90 text-white shadow-lg shadow-green-500/20 transition-transform duration-300 group-hover:scale-110">
                    <HugeiconsIcon {icon} size={20} color="currentColor" strokeWidth={2} />
                </div>

                <div class="flex flex-col gap-1.5">
                    <h3 class="text-sm font-bold leading-snug">{title}</h3>
                    <p class="text-sm leading-relaxed opacity-55">{description}</p>
                </div>

                <button class="mt-auto flex w-fit cursor-pointer items-center gap-1.5 text-xs font-semibold text-green-500 transition-all duration-200 hover:gap-3 hover:text-green-400 dark:text-green-400 dark:hover:text-green-300">
                    Saiba mais
                    <HugeiconsIcon icon={ArrowRight01Icon} size={13} color="currentColor" strokeWidth={2.5} />
                </button>
            </div>
        {/each}
    </div>

</div>