<script lang="ts">
  interface Props {
    type?: "warning" | "info" | "success";
    children: import("svelte").Snippet;
  }

  let { type = "info", children }: Props = $props();

  const styles = {
    info: {
      wrap: "bg-green-50 border-l-[3px] border-green-700",
      icon: "text-green-700",
    },
    warning: {
      wrap: "bg-amber-50  border-l-[3px] border-amber-500",
      icon: "text-amber-500",
    },
    success: {
      wrap: "bg-emerald-50 border-l-[3px] border-emerald-600",
      icon: "text-emerald-600",
    },
  } as const;

  const icons = { info: "ℹ", warning: "⚠", success: "✓" } as const;

  const s = $derived(styles[type]);
</script>

<div class="my-4 flex gap-3 rounded-lg px-5 py-4 {s.wrap}">
  <span class="mt-0.5 shrink-0 text-base {s.icon}">{icons[type]}</span>
  <div
    class="text-sm leading-relaxed text-gray-600 [&_strong]:font-semibold [&_strong]:text-[#1a2e1c]"
  >
    {@render children()}
  </div>
</div>
