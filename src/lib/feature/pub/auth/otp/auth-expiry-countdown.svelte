<script lang="ts">
  import { userAuthStore } from "$lib/stores/user-auth.store";

  let remaining = $state(0);
  let interval: ReturnType<typeof setInterval> | null = null;

  const days = $derived(Math.floor(remaining / 86_400_000));
  const hours = $derived(Math.floor((remaining % 86_400_000) / 3_600_000));
  const minutes = $derived(Math.floor((remaining % 3_600_000) / 60_000));
  const seconds = $derived(Math.floor((remaining % 60_000) / 1_000));
  const isUrgent = $derived(remaining > 0 && remaining < 300_000);
  const isExpired = $derived(remaining <= 0);

  const pad = (n: number) => String(n).padStart(2, "0");

  $effect(() => {
    const unsubscribe = userAuthStore.subscribe(($store) => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }

      if (!$store?.expiredAt) {
        remaining = 0;
        return;
      }

      const expireTime = Date.parse($store.expiredAt);

      const tick = () => {
        remaining = Math.max(0, expireTime - Date.now());
      };

      tick();
      interval = setInterval(tick, 1000);
    });

    return () => {
      unsubscribe();
      if (interval) clearInterval(interval);
    };
  });
</script>

{#if isExpired}
  <div class="hidden md:flex items-center gap-1.5 text-red-500 text-xs font-medium">
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1.5" />
      <path d="M16 9v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="16" cy="21.5" r="1" fill="currentColor" />
    </svg>
    <span>Sessão expirada</span>
  </div>
{:else if remaining > 0}
  <div class="hidden md:flex items-center gap-1.5 text-xs">
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none" class={isUrgent ? "text-red-400" : "text-gray-400"}>
      <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1.5" />
      <path d="M16 9v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="16" cy="21.5" r="1" fill="currentColor" />
    </svg>
    <span class="text-gray-400">Sessão</span>
    <span class={isUrgent ? "text-red-500 font-semibold animate-pulse" : "text-gray-700 dark:text-gray-200 font-medium"}>
      {#if days > 0}{pad(days)}d :{/if}{pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </span>
  </div>
{/if}