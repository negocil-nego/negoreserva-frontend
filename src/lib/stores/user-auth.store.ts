import { writable, get, derived, type Readable } from "svelte/store";
import { browser } from "$app/environment";
import type { UserAuthResponse } from "$lib/feature/pub/auth/register/data/model/register.model";

function createUserAuthResponseStore() {
    let initialValue: UserAuthResponse | undefined = undefined;
    const storageKey = "user-auth-data";

    if (browser) {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                initialValue = JSON.parse(saved);
            } catch (e) {
                console.error("Erro ao parsear dados do localStorage", e);
            }
        }
    }

    const store = writable<UserAuthResponse | undefined>(initialValue);

    if (browser) {
        store.subscribe((value) => {
            if (value === undefined) {
                localStorage.removeItem(storageKey);
            } else {
                localStorage.setItem(storageKey, JSON.stringify(value));
            }
        });
    }

    function computeIsAuthenticated(value: UserAuthResponse | undefined): boolean {
        if (value === undefined || value.token === "") return false;
        if (value.expiredAt) {
            return Date.now() < Date.parse(value.expiredAt);
        }
        return true;
    }

    const isAuthenticated: Readable<boolean> = derived(store, computeIsAuthenticated);

    const updateUserAuthResponse = (response: UserAuthResponse) => {
        localStorage.setItem("token", response.token);
        store.set({ ...response });
    };

    const logoutUserAuthResponse = () => {
        localStorage.removeItem("token");
        store.set(undefined);
    };

    const checkAndHandleExpiration = (): boolean => {
        const value = get(store);
        if (value?.expiredAt && Date.now() >= Date.parse(value.expiredAt)) {
            logoutUserAuthResponse();
            return true;
        }
        return false;
    };

    return {
        subscribe: store.subscribe,
        reset: () => store.set(undefined),
        getUserAuthResponse: () => get(store),
        setUserAuthResponse: updateUserAuthResponse,
        logoutUserAuthResponse,
        isAuthenticated,
        checkAndHandleExpiration,
    };
}

export const userAuthStore = createUserAuthResponseStore();
export const isAuthenticatedStore = userAuthStore.isAuthenticated;