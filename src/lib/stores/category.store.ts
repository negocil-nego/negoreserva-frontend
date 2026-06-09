import { writable, get, derived } from "svelte/store";
import { browser } from "$app/environment";
import type { CategoryResponse } from "$lib/feature/shared/category/model/category.model";

function createCategorySelectedStore() {
    const storageKey = "category-selected";
    let initialValue: CategoryResponse[] = [];

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

    const store = writable<CategoryResponse[]>(initialValue);

    if (browser) {
        store.subscribe((value) => {
            localStorage.setItem(storageKey, JSON.stringify(value));
        });
    }

    function toggle(category: CategoryResponse) {
        store.update((items) => {
            const index = items.findIndex((i) => i.uuid === category.uuid);
            if (index >= 0) {
                return items.filter((i) => i.uuid !== category.uuid);
            }
            return [...items, category];
        });
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
        toggle,
        clear,
        isEmpty,
        getItems,
    };
}

export const categorySelectedStore = createCategorySelectedStore();

export const categorySelectedCount = derived(categorySelectedStore, ($items) => $items.length);
