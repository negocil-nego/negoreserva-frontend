<script lang="ts">
  import {
    isOtpExpired,
    registerStore,
  } from "../../../../stores/register.store";

  let remaining = $state(0);
  let interval: ReturnType<typeof setInterval> | null = null;

  const days = $derived(Math.floor(remaining / 86_400_000));
  const hours = $derived(Math.floor((remaining % 86_400_000) / 3_600_000));
  const minutes = $derived(Math.floor((remaining % 3_600_000) / 60_000));
  const seconds = $derived(Math.floor((remaining % 60_000) / 1_000));
  const isUrgent = $derived(remaining > 0 && remaining < 30_000);

  const pad = (n: number) => String(n).padStart(2, "0");

  $effect(() => {
    const unsubscribe = registerStore.subscribe(($store) => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }

      if (!$store?.otpExpiredAt) {
        remaining = 0;
        return;
      }

      const expireTime = Date.parse($store.otpExpiredAt);

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

{#if $isOtpExpired}
  <div class="flex flex-col items-center gap-2 py-6 px-8">
    <div class="text-red-400">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path
          d="M16 9v8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <circle cx="16" cy="21.5" r="1" fill="currentColor" />
      </svg>
    </div>
    <p class="text-sm font-medium text-gray-700 mt-1">Código expirado</p>
    <p class="text-xs text-gray-400">Solicita um novo código para continuar</p>
  </div>
{:else if remaining > 0}
  <div class="flex flex-col items-center gap-2 py-3 px-8">
    <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">
      Código válido por
    </p>

    <div class="flex items-end gap-1">
      {#if days > 0}
        <div class="flex flex-col items-center w-14">
          <span
            class="text-3xl font-light tabular-nums tracking-tight text-gray-900 dark:text-white"
          >
            {pad(days)}
          </span>
          <span class="text-xs text-gray-400 mt-1.5">Dia</span>
        </div>
        <span class="text-2xl font-extralight text-gray-300 mb-5">:</span>
      {/if}

      <div class="flex flex-col items-center w-14">
        <span
          class="text-3xl font-light tabular-nums tracking-tight text-gray-900 dark:text-white"
        >
          {pad(hours)}
        </span>
        <span class="text-xs text-gray-400 mt-1.5">hora</span>
      </div>

      <span class="text-2xl font-extralight text-gray-300 mb-5">:</span>

      <div class="flex flex-col items-center w-14">
        <span
          class="text-3xl font-light tabular-nums tracking-tight text-gray-900 dark:text-white"
        >
          {pad(minutes)}
        </span>
        <span class="text-xs text-gray-400 mt-1.5">min</span>
      </div>

      <span class="text-2xl font-extralight text-gray-300 mb-5">:</span>

      <div class="flex flex-col items-center w-14">
        <span
          class="text-3xl font-light tabular-nums tracking-tight transition-colors duration-300
          {isUrgent
            ? 'text-red-500 animate-pulse'
            : 'text-gray-900 dark:text-white'}"
        >
          {pad(seconds)}
        </span>
        <span class="text-xs text-gray-400 mt-1.5">sec</span>
      </div>
    </div>
  </div>
{/if}
