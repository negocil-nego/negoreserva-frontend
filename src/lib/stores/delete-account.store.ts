import { browser } from "$app/environment";
import { derived, get, writable } from "svelte/store";
import type { UserDeleteAccountResponse } from "$lib/feature/pub/auth/delete-account/data/model/delete-account.model";

const DELETE_ACCOUNT_KEY = "delete-account-process";

function createDeleteAccountStore() {
  let initialValue: UserDeleteAccountResponse | undefined;

  if (browser) {
    const saved = localStorage.getItem(DELETE_ACCOUNT_KEY);
    if (saved) {
      try {
        initialValue = JSON.parse(saved);
      } catch {
        initialValue = undefined;
      }
    }
  }

  const store = writable<UserDeleteAccountResponse | undefined>(initialValue);

  if (browser) {
    store.subscribe((value) => {
      if (value) {
        localStorage.setItem(DELETE_ACCOUNT_KEY, JSON.stringify(value));
      } else {
        localStorage.removeItem(DELETE_ACCOUNT_KEY);
      }
    });
  }

  return {
    subscribe: store.subscribe,
    getProcess: () => get(store),
    reset: () => store.set(undefined),
    setProcess: (response: UserDeleteAccountResponse) => store.set({ ...response }),
  };
}

export const deleteAccountStore = createDeleteAccountStore();

export const isDeleteAccountExpired = derived(deleteAccountStore, ($store, set) => {
  if (!$store?.expiredAt) {
    set(false);
    return;
  }

  const check = () => {
    const expired = Date.now() >= Date.parse($store.expiredAt);
    set(expired);

    if (expired) {
      deleteAccountStore.reset();
      clearInterval(interval);
    }
  };

  check();
  const interval = setInterval(check, 1000);
  return () => clearInterval(interval);
}, false);
