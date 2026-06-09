import { writable, get, derived } from "svelte/store";
import { browser } from "$app/environment";
import type { OrganizationResponse } from "$lib/feature/pub/organization";

function createOrganizationSelectedStore() {
    const storageKey = "organization-selected";
    let initialValue: OrganizationResponse[] = [];

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

    const store = writable<OrganizationResponse[]>(initialValue);

    if (browser) {
        store.subscribe((value) => {
            localStorage.setItem(storageKey, JSON.stringify(value));
        });
    }

    function toggle(organization: OrganizationResponse) {
        store.update((items) => {
            const index = items.findIndex((i) => i.uuid === organization.uuid);
            if (index >= 0) {
                return items.filter((i) => i.uuid !== organization.uuid);
            }
            return [...items, organization];
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

export const organizationSelectedStore = createOrganizationSelectedStore();

export const organizationSelectedCount = derived(organizationSelectedStore, ($items) => $items.length);
