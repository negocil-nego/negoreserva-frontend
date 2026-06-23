import { writable, get, derived } from "svelte/store";
import { browser } from "$app/environment";

export interface FavoriteItem {
    productUuid: string;
    productName: string;
    productImage?: string | null;
    organizationName: string;
    organizationSlug: string;
}

function createFavoriteStore() {
    const storageKey = "favorite-items";
    let initialValue: FavoriteItem[] = [];

    if (browser) {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                initialValue = JSON.parse(saved);
            } catch {
                initialValue = [];
            }
        }
    }

    const store = writable<FavoriteItem[]>(initialValue);

    if (browser) {
        store.subscribe((value) => {
            localStorage.setItem(storageKey, JSON.stringify(value));
        });
    }

    function toggle(item: FavoriteItem) {
        store.update((items) => {
            const existing = items.findIndex((i) => i.productUuid === item.productUuid);
            if (existing >= 0) {
                return items.filter((i) => i.productUuid !== item.productUuid);
            }
            return [...items, item];
        });
    }

    function isFavorite(productUuid: string): boolean {
        return get(store).some((i) => i.productUuid === productUuid);
    }

    function getItems() {
        return get(store);
    }

    return {
        subscribe: store.subscribe,
        toggle,
        isFavorite,
        getItems,
    };
}

export const favoriteStore = createFavoriteStore();
export const favoriteCount = derived(favoriteStore, ($items) => $items.length);
