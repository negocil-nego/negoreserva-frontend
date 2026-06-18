<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Briefcase01Icon, ShieldCheck } from "@hugeicons/core-free-icons";
  import { resolve } from "$app/paths";

  let {
    title = "Assine nossa newsletter",
    description = "Receba semanalmente em seu e-mail as principais tendências, artigos exclusivos e atualizações sobre nossas soluções de tecnologia.",
    placeholder = "Seu melhor e-mail",
    buttonText = "Inscrever-se",
  } = $props();

  const navigation = [
    {
      title: "Legal",
      icon: ShieldCheck,
      links: [
        { name: "Termos de Serviço", href: "/legal/terms-of-use" },
        { name: "Política de Privacidade", href: "/legal/privacy-policy" },
      ],
    },
    {
      title: "Empresa",
      icon: Briefcase01Icon,
      links: [
        { name: "Blog", href: "/site" },
        { name: "Aplicativo", href: "/site/app" },
        { name: "Trabalhe Connosco", href: "/" },
        { name: "Treinamento", href: "/" },
      ],
    },
  ];
</script>

<div class="relative isolate overflow-hidden py-16 bg-panel rounded-0">
  <div class="mx-auto max-w-7xl px-6 lg:lg:px-8">
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"
    >
      <div class="max-w-xl lg:max-w-lg">
        <div class="text-4xl font-semibold tracking-tight">
          {title}
        </div>
        <p class="mt-4 text-lg">{description}</p>
        <form class="mt-6 flex max-w-md gap-x-4">
          <input
            type="email"
            required
            {placeholder}
            class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base outline -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
          />
          <button
            type="submit"
            class="flex-none rounded-md bg-brand px-3.5 py-2.5 text-sm font-semibold"
          >
            {buttonText}
          </button>
        </form>
      </div>

      <div class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
        {#each navigation as section (section.title)}
          <div class="flex flex-col items-start">
            <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <HugeiconsIcon
                icon={section.icon}
                size={24}
                color="#ffffff"
                strokeWidth={1.5}
              />
            </div>
            <div class="mt-4 text-base font-semibold">
              {section.title}
            </div>
            <ul class="mt-2 space-y-2">
              {#each section.links as link (link.name)}
                <li>
                  <a
                    href={resolve(link.href as any)}
                    class="text-base text-gray-400 hover:text-gray-700  transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
