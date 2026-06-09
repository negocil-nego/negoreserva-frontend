<script>
    import HeroGallery from "./hero-gallery.svelte";

    let expanded = false;
</script>

<section class="relative flex w-full items-center justify-between gap-10 overflow-hidden max-md:flex-col">

    <!-- Text -->
    <div class="w-full max-w-[480px] md:max-w-3/6 animate-[fadeUp_.7s_ease_.1s_both]">
        <hgroup class="mb-7 space-y-3">
            <h1 class="text-xl md:text-3xl font-extrabold leading-[1.05] tracking-tight">
                Encontre os melhores lugares
            </h1>

            <h2 class="leading-relaxed opacity-80 {!expanded ? 'md:line-clamp-none line-clamp-2' : ''}">
                Hotéis, restaurantes e destinos turísticos, reservas rápidas e pagamento seguro
            </h2>
        </hgroup>

        <p class="max-w-[520px] text-sm leading-relaxed opacity-70 {!expanded ? 'md:line-clamp-none line-clamp-2' : ''}">
            Compare preços, veja avaliações e encontre locais próximos. Reserve online de forma simples e segura — tudo
            num único lugar.
        </p>

        <button
                class="mt-1 text-sm font-medium opacity-70 underline underline-offset-2 md:hidden"
                onclick={() => expanded = !expanded}
        >
            {expanded ? 'Ver menos' : 'Ver mais'}
        </button>

        <div class="mt-6 hidden md:flex flex-wrap gap-3 text-xs uppercase tracking-widest opacity-50">
            <span>Reservas Online</span>
            <span>•</span>
            <span>Pagamento Seguro</span>
            <span>•</span>
            <span>Pesquisa Próxima</span>
            <span>•</span>
            <span>Comparação de Preços</span>
        </div>
    </div>

    <!-- Gallery -->
    <HeroGallery/>
</section>