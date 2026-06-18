<script lang="ts">
  interface Props {
    relatedHref: "/legal/privacy-policy" | "/legal/terms-of-use";
    relatedLabel: string;
    supportHref?: string;
    supportLabel?: string;
  }

  let {
    relatedHref,
    relatedLabel,
    supportHref = "mailto:suporte@negoreserva.ao",
    supportLabel = "Falar com Suporte",
  }: Props = $props();
</script>

<div class="flex flex-col md:flex-row gap-4 md:w-full">
<a
  href={relatedHref}
  class="inline-flex items-center justify-center rounded-lg border-[1.5px] border-green-700 px-5 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50 sm:w-full"
>
  {relatedLabel}
</a>
<a
  href={supportHref}
  class="inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 sm:w-full"
>
  {supportLabel}
</a>
</div>
