import { browser } from "$app/environment";
import { QueryClient } from "@sveltestack/svelte-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            enabled: browser,
        },
    },
});