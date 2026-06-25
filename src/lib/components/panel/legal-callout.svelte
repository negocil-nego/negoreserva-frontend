<script lang="ts">
  interface Props {
    type?: "warning" | "info" | "success";
    children: import("svelte").Snippet;
  }

  let { type = "info", children }: Props = $props();

  const styles = {
    info: {
      wrap: "bg-green-50 border-green-200",
      icon: "bg-white text-green-700 ring-green-100",
    },
    warning: {
      wrap: "bg-amber-50 border-amber-200",
      icon: "bg-white text-amber-600 ring-amber-100",
    },
    success: {
      wrap: "bg-emerald-50 border-emerald-200",
      icon: "bg-white text-emerald-700 ring-emerald-100",
    },
  } as const;

  const icons = { info: "ℹ", warning: "⚠", success: "✓" } as const;

  const s = $derived(styles[type]);
</script>

<div class="my-5 flex gap-3 border px-5 py-4 shadow-sm {s.wrap}">
  <span
    class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm ring-4 {s.icon}"
  >
    {icons[type]}
  </span>
  <div
    class="text-sm leading-relaxed text-gray-600  [&_strong]:font-semibold [&_strong]:text-[#1a2e1c]"
  >
    {@render children()}
  </div>
</div>
