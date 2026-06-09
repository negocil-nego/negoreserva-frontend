import { writable, get, derived } from "svelte/store";
import { browser } from "$app/environment";
import type {ProductPriceGetOrgResponse} from "$lib/feature/pub/organization/data/model/organization.model";

export interface CartItem {
    productUuid: string;
    productSlug: string;
    productName: string;
    price: ProductPriceGetOrgResponse;
    amount: number;
    image?: string | null;
}

function createCartStore() {
    const storageKey = "cart-items";
    let initialValue: CartItem[] = [];

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

    const store = writable<CartItem[]>(initialValue);

    if (browser) {
        store.subscribe((value) => {
            localStorage.setItem(storageKey, JSON.stringify(value));
        });
    }

    function addItem(item: CartItem) {
        store.update((items) => {
            const existing = items.findIndex(
                (i) => i.productUuid === item.productUuid && i.price.uuid === item.price.uuid
            );
            if (existing >= 0) {
                items[existing] = { ...items[existing], amount: item.amount };
            } else {
                items.push(item);
            }
            return items;
        });
    }

    function removeItem(productUuid: string) {
        store.update((items) => items.filter((i) => i.productUuid !== productUuid));
    }

    function clear() {
        store.set([]);
    }

    function isEmpty() {
        return get(store).length === 0;
    }

    function getItems() {
        return get(store);
    }

    return {
        subscribe: store.subscribe,
        addItem,
        removeItem,
        clear,
        isEmpty,
        getItems,
    };
}

export const cartStore = createCartStore();

export const cartCount = derived(cartStore, ($cart) => $cart.length);
