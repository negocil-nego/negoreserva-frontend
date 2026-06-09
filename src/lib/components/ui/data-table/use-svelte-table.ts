import { createSvelteTable } from "./data-table.svelte.js";

export function useSvelteTable<TData>(options: Parameters<typeof createSvelteTable<TData>>[0]) {
  return createSvelteTable<TData>(options);
}