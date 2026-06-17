import { writable, get } from "svelte/store";
import { browser } from "$app/environment";

export interface SearchFilterState {
    q: string;
    searchType: string;
    province: string;
    municipality: string;
    isHighlight: boolean;
    isSearching: boolean;
    priceMin: number | null;
    priceMax: number | null;
    categoryUuids: string[];
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
        priceMin: null,
        priceMax: null,
        categoryUuids: []
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
            if (!isSearching) localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
        });
    }

    function setFilter(partial: Partial<SearchFilterState>) {
        store.update((state) => ({ ...state, ...partial }));
    }

    function clearCategory() {
        store.update((state) => ({ ...state, categoryUuids: [] }));
    }

    function toggleCategory(categoryUuid: string) {
        store.update((state) => {
            const isPresent = state.categoryUuids.includes(categoryUuid);
            return { 
                ...state, 
                categoryUuids: isPresent ? state.categoryUuids.filter((i) => i !== categoryUuid) : [...state.categoryUuids, categoryUuid] 
            };
        });
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
        toggleCategory,
        clearCategory,
        getState: () => get(store),
    };
}

export const searchFilterStore = createSearchFilterStore();
