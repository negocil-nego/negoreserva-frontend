<script lang="ts">
  import { useCountdown } from "$lib/hooks/use-countdown.svelte";

  let {
    expiredAt,
  }: {
    expiredAt: string | null | undefined;
  } = $props();

  const countdown = useCountdown(() => expiredAt);
</script>

{#if countdown.isExpired}
  <div class="flex flex-col items-center gap-2 py-3 px-8">
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
{:else if countdown.remaining > 0}
  <div class="flex flex-col items-center gap-2 py-3 px-8">
    <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">
      Código válido por
    </p>
    <div class="flex items-end gap-1">
      {#if countdown.days > 0}
        <div class="flex flex-col items-center w-14">
          <span
            class="text-3xl font-light tabular-nums tracking-tight text-gray-900 dark:text-white"
          >
            {countdown.pad(countdown.days)}
          </span>
          <span class="text-xs text-gray-400 mt-1.5">Dia</span>
        </div>
        <span class="text-2xl font-extralight text-gray-300 mb-5">:</span>
      {/if}
      <div class="flex flex-col items-center w-14">
        <span
          class="text-3xl font-light tabular-nums tracking-tight text-gray-900 dark:text-white"
        >
          {countdown.pad(countdown.hours)}
        </span>
        <span class="text-xs text-gray-400 mt-1.5">hora</span>
      </div>
      <span class="text-2xl font-extralight text-gray-300 mb-5">:</span>
      <div class="flex flex-col items-center w-14">
        <span
          class="text-3xl font-light tabular-nums tracking-tight text-gray-900 dark:text-white"
        >
          {countdown.pad(countdown.minutes)}
        </span>
        <span class="text-xs text-gray-400 mt-1.5">min</span>
      </div>
      <span class="text-2xl font-extralight text-gray-300 mb-5">:</span>
      <div class="flex flex-col items-center w-14">
        <span
          class="text-3xl font-light tabular-nums tracking-tight transition-colors duration-300
          {countdown.isUrgent
            ? 'text-red-500 animate-pulse'
            : 'text-gray-900 dark:text-white'}"
        >
          {countdown.pad(countdown.seconds)}
        </span>
        <span class="text-xs text-gray-400 mt-1.5">sec</span>
      </div>
    </div>
  </div>
{/if}
