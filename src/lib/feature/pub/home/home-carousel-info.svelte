<script lang="ts">
    const slides = [
        {
            title: "Conheça os melhores lugares",
            desc: "Se procuras hotéis, hospedaria, restaurantes, ou qualquer outro lugar para fazer uma reserva, faça aqui de forma simples e rápida!",
        },
        {
            title: "Reserve com facilidade",
            desc: "Escolha entre as melhores empresas da região com apenas alguns cliques e garanta sua vaga agora mesmo.",
        },
        {
            title: "Experiências únicas",
            desc: "Não apenas reservas, mas momentos inesquecíveis. Descubra os locais mais bem avaliados.",
        },
    ];

    let activeIndex = $state(0);
    let displayText = $state("");

    $effect(() => {
        const text = slides[activeIndex].title;
        let i = 0;
        displayText = "";

        const typeTimer = setInterval(() => {
            displayText += text[i];
            i++;
            if (i === text.length) clearInterval(typeTimer);
        }, 60);

        const autoPlayTimer = setInterval(() => {
            activeIndex = (activeIndex + 1) % slides.length;
        }, 5000);

        return () => {
            clearInterval(typeTimer);
            clearInterval(autoPlayTimer);
        };
    });
</script>

{#snippet indicator()}
    <div class="hidden md:block absolute top-2 right-4 text-xs font-mono text-gray-400">
        0{activeIndex + 1} <span class="text-brand">/ 0{slides.length}</span>
    </div>
{/snippet}

<div class="relative my-5 container">
    <div
        class="relative w-full border-b bg-panel p-2 md:p-4 overflow-hidden flex flex-col-reverse gap-3"
    >
        {@render indicator()}

        <div class="md:space-y-1">
            <h2 class="text-xl md:text-2xl font-extrabold h-8 md:h-10">
                {displayText}
            </h2>

            <p
                class="text-[12px] md:text-[15px] text-gray-700 dark:text-gray-200 max-w-125"
            >
                {slides[activeIndex].desc}
            </p>
        </div>

        <div class="flex gap-2 md:mt-6 md:absolute right-2 md:top-4">
            {#each slides as slide, i (i)}
                <button
                    onclick={() => (activeIndex = i)}
                    class="h-2 w-5 rounded-full transition-all duration-300 {activeIndex === i ? 'bg-green-900': 'bg-gray-300'}"
                    aria-label="Slide {i + 1} {slide.title}"
                ></button>
            {/each}
        </div>
    </div>
</div>
