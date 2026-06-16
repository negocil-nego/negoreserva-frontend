import { writable, get } from "svelte/store";
import { browser } from "$app/environment";

export interface SearchFilterState {
    q: string;
    searchType: string;
    province: string;
    municipality: string;
    isHighlight: boolean;
    isSearching: boolean;
}

const STORAGE_KEY = "search-filter-data";

function createSearchFilterStore() {
    const defaults: SearchFilterState = {
        q: "",
        searchType: "all",
        province: "",
        municipality: "",
        isHighlight: false,
        isSearching: false,
    };

    let initial: SearchFilterState = { ...defaults };

    if (browser) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                initial = { ...defaults, ...JSON.parse(saved) };
            } catch {
                initial = { ...defaults };
            }
        }
    }

    const store = writable<SearchFilterState>(initial);

    if (browser) {
        store.subscribe((value) => {
            const { isSearching, ...persistable } = value;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
        });
    }

    function setFilter(partial: Partial<SearchFilterState>) {
        store.update((state) => ({ ...state, ...partial }));
    }

    function search() {
        store.update((state) => ({ ...state, isSearching: true }));
    }

    function clear() {
        store.set({ ...defaults });
    }

    function clearFilters() {
        store.update((state) => ({
            ...state,
            q: "",
            province: "",
            municipality: "",
            isHighlight: false,
            searchType: "all",
            isSearching: false,
        }));
    }

    return {
        subscribe: store.subscribe,
        setFilter,
        search,
        clear,
        clearFilters,
        getState: () => get(store),
    };
}

export const searchFilterStore = createSearchFilterStore();
