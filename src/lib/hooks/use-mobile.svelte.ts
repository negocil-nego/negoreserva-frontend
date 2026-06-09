import { browser } from "$app/environment";

export const MOBILE_BREAKPOINT = 768;

export function useMobile() {
    let isMobile = $state(false);

    $effect(() => {
        if (!browser) return;

        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        isMobile = mql.matches;

        const onChange = (e: MediaQueryListEvent) => {
            isMobile = e.matches;
        };

        mql.addEventListener("change", onChange);

        return () => mql.removeEventListener("change", onChange);
    });

    return {
        get isMobile() {
            return isMobile;
        },
    };
}