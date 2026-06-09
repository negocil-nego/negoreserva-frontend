export function useCountdown(getExpiredAt: () => string | null | undefined) {
  let remaining = $state(0);
  let interval: ReturnType<typeof setInterval> | null = null;

  $effect(() => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }

    const expiredAt = getExpiredAt();

    if (!expiredAt) {
      remaining = 0;
      return;
    }

    const expireTime = Date.parse(expiredAt);

    const tick = () => {
      remaining = Math.max(0, expireTime - Date.now());
    };

    tick();
    interval = setInterval(tick, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  });

  const days = $derived(Math.floor(remaining / 86_400_000));
  const hours = $derived(Math.floor((remaining % 86_400_000) / 3_600_000));
  const minutes = $derived(Math.floor((remaining % 3_600_000) / 60_000));
  const seconds = $derived(Math.floor((remaining % 60_000) / 1_000));
  const isUrgent = $derived(remaining > 0 && remaining < 30_000);
  const isExpired = $derived(remaining <= 0);

  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    get remaining() { return remaining; },
    get days() { return days; },
    get hours() { return hours; },
    get minutes() { return minutes; },
    get seconds() { return seconds; },
    get isUrgent() { return isUrgent; },
    get isExpired() { return isExpired; },
    get pad() { return pad; },
  };
}
