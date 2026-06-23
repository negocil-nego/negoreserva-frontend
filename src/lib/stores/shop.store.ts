import { writable, get, derived } from "svelte/store";
import { browser } from "$app/environment";

export interface ShopItem {
    productUuid: string;
    productName: string;
    price: number;
    organizationName: string;
    organizationSlug: string;
    image?: string | null;
    quantity: number;
}

function createShopStore() {
    const storageKey = "shop-items";
    let initialValue: ShopItem[] = [];

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

    const store = writable<ShopItem[]>(initialValue);

    if (browser) {
        store.subscribe((value) => {
            localStorage.setItem(storageKey, JSON.stringify(value));
        });
    }

    function addItem(item: Omit<ShopItem, "quantity">) {
        store.update((items) => {
            const existing = items.findIndex((i) => i.productUuid === item.productUuid);
            if (existing >= 0) {
                items[existing] = { ...items[existing], quantity: items[existing].quantity + 1 };
            } else {
                items.push({ ...item, quantity: 1 });
            }
            return items;
        });
    }

    function removeItem(productUuid: string) {
        store.update((items) => items.filter((i) => i.productUuid !== productUuid));
    }

    function updateQuantity(productUuid: string, quantity: number) {
        store.update((items) => items.map((i) => i.productUuid === productUuid ? { ...i, quantity: Math.max(1, quantity) } : i));
    }

    function clear() {
        store.set([]);
    }

    function getItems() {
        return get(store);
    }

    return {
        subscribe: store.subscribe,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        getItems,
    };
}

export const shopStore = createShopStore();
export const shopCount = derived(shopStore, ($items) => $items.reduce((total, item) => total + item.quantity, 0));
