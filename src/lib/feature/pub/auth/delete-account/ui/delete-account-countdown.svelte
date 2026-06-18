<script lang="ts">
  import { onDestroy } from "svelte";

  interface Props {
    expiredAt: string;
    onExpired?: () => void;
  }

  let { expiredAt, onExpired }: Props = $props();

  let remaining = $state(0);

  function updateRemaining() {
    remaining = Math.max(0, Date.parse(expiredAt) - Date.now());
    if (remaining === 0) onExpired?.();
  }

  updateRemaining();
  const interval = setInterval(updateRemaining, 1000);

  onDestroy(() => clearInterval(interval));

  const minutes = $derived(Math.floor(remaining / 60000));
  const seconds = $derived(Math.floor((remaining % 60000) / 1000));
  const formatted = $derived(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
</script>

<div class="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-center">
  <p class="text-xs font-medium uppercase text-amber-700">Tempo para terminar o processo</p>
  <p class="mt-1 font-mono text-2xl font-bold text-amber-800">{formatted}</p>
</div>
