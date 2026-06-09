import type { CreateAccountResponse } from "$lib/feature/pub/auth/register/data/model/register.model";
import type { CategoryResponse } from "$lib/feature/shared/category/model/category.model";
import { writable, derived, get } from "svelte/store";
import { browser } from "$app/environment";

function createAccountResponseStore() {
    const store = writable<CreateAccountResponse | undefined>(undefined);

    return {
        subscribe: store.subscribe,
        reset: () => store.set(undefined),
        getAccountResponse: () => get(store),
        resetStatus: () => store.update((data) => ({ ...data!, status: false })),
        setAccountResponse: (response: CreateAccountResponse) => store.set({ ...response }),
    };
}

const REGISTER_CATEGORIES_KEY = "register-categories";

function createRegisterCategoryStore() {
    let initialValue: CategoryResponse[] = [];
    if (browser) {
        const saved = localStorage.getItem(REGISTER_CATEGORIES_KEY);
        if (saved) {
            try { initialValue = JSON.parse(saved); } catch { initialValue = []; }
        }
    }

    const store = writable<CategoryResponse[]>(initialValue);

    if (browser) {
        store.subscribe((value) => {
            if (value.length > 0) {
                localStorage.setItem(REGISTER_CATEGORIES_KEY, JSON.stringify(value));
            } else {
                localStorage.removeItem(REGISTER_CATEGORIES_KEY);
            }
        });
    }

    return {
        subscribe: store.subscribe,
        toggle: (category: CategoryResponse) => store.update((items) => {
            const index = items.findIndex((i) => i.uuid === category.uuid);
            if (index >= 0) return items.filter((i) => i.uuid !== category.uuid);
            return [...items, category];
        }),
        clear: () => store.set([]),
        getItems: () => get(store),
    };
}

export const registerStore = createAccountResponseStore();
export const registerCategoryStore = createRegisterCategoryStore();

export const isAccountResponse = derived(registerStore, ($store) => {
    return !!$store;
})

export const isOtpExpired = derived(registerStore, ($store, set) => {
    if (!$store?.status) {
        set(false);
        return;
    }

    const check = () => {
        const expired = Date.now() >= Date.parse($store.otpExpiredAt);
        set(expired);

        if (expired) {
            registerStore.resetStatus();
            clearInterval(interval);
        }
    };

    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
}, false);