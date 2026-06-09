import { writable, get } from "svelte/store";
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

    const updateUserAuthResponse = (response: UserAuthResponse) => {
        localStorage.setItem("token", response.token);
        store.set({ ...response })
    }

    const logoutUserAuthResponse = () => {
        localStorage.removeItem("token");
        store.set(undefined);
    }

    const isAuthenticated = () => {
        const userAuthResponse = get(store);
        if (userAuthResponse === undefined || userAuthResponse.token === "") {
            return false;
        }
        if (userAuthResponse.expiredAt) {
            const expiredAt = Date.parse(userAuthResponse.expiredAt);
            if (Date.now() >= expiredAt) {
                logoutUserAuthResponse();
                return false;
            }
        }
        return true;
    }

    const isSessionExpired = () => {
        const userAuthResponse = get(store);
        if (!userAuthResponse?.expiredAt) return false;
        const expired = Date.now() >= Date.parse(userAuthResponse.expiredAt);
        if (expired) logoutUserAuthResponse();
        return expired;
    }

    return {
        subscribe: store.subscribe,
        reset: () => store.set(undefined),
        getUserAuthResponse: () => get(store),
        setUserAuthResponse: updateUserAuthResponse,
        logoutUserAuthResponse,
        isAuthenticated,
        isSessionExpired
    };
}

export const userAuthStore = createUserAuthResponseStore();