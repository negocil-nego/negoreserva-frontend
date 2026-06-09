<script lang="ts">
  const sections = [
    {
      title: "Menu",
      links: ["Início", "Serviços"],
    },
    {
      title: "Suporte",
      links: ["Treinamento", "Documentação", "Guias"],
    },
    {
      title: "A Empresa",
      links: ["Sobre", "Blog", "Trabalhe Connosco", "Imprensa"],
    },
    {
      title: "Legal",
      links: ["Termos de Serviço", "Política de Privacidade"],
    },
  ];

  const socialIcons = [
    {
      name: "Facebook",
      src: "https://img.icons8.com/ios-glyphs/30/9ca3af/facebook-new.png",
    },
    {
      name: "Instagram",
      src: "https://img.icons8.com/ios-glyphs/30/9ca3af/instagram-new.png",
    },
    {
      name: "X",
      src: "https://img.icons8.com/ios-glyphs/30/9ca3af/twitterx--v2.png",
    },
    {
      name: "GitHub",
      src: "https://img.icons8.com/ios-glyphs/30/9ca3af/github.png",
    },
    {
      name: "YouTube",
      src: "https://img.icons8.com/ios-glyphs/30/9ca3af/youtube-play.png",
    },
  ];
</script>

<footer
  class=" text-gray-400 py-16 px-6 font-sans border-t border-slate-200 dark:border-slate-700 mt-10"
>
  <div class="max-w-7xl mx-auto">
    <!-- Grid Principal -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
      {#each sections as section (section.title)}
        <div>
          <h3 class="text-white font-semibold mb-4">{section.title}</h3>
          <ul class="space-y-3">
            {#each section.links as link (link)}
              <li>
                <div class="hover:text-white transition-colors">{link}</div>
              </li>
            {/each}
          </ul>
        </div>
      {/each}

      <!-- Newsletter Section -->
      <div class="col-span-2 lg:col-span-2">
        <h3 class="text-white font-semibold mb-4">
          Subscreva a nossa newsletter
        </h3>
        <p class="mb-4 text-sm leading-6">
          Os últimos artigos, novidades e recursos, enviados para a sua caixa de
          entrada semanalmente.
        </p>
        <form class="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            class="bg-gray-400/5 border border-gray-400/10 rounded-md px-4 py-2 text-white w-full focus:outline-hidden focus:ring-2 focus:ring-green-500 transition-all"
          />
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-md transition-colors"
          >
            Subscrever
          </button>
        </form>
      </div>
    </div>

    <!-- Linha Inferior -->
    <div
      class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
    >
      <p class="text-sm">© 2024 Your Company, Inc. All rights reserved.</p>

      <div class="flex gap-6">
        {#each socialIcons as icon (icon.name)}
          <a
            href="#"
            rel="noopener noreferrer"
            aria-label={icon.name}
            class="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img src={icon.src} alt={icon.name} class="w-6 h-6" />
          </a>
        {/each}
      </div>
    </div>
  </div>
</footer>
