import { writable, get } from "svelte/store";
import { browser } from "$app/environment";

export interface CatalogProductSelection {
  productUuid: string;
  order: number;
}

function createCatalogProductStore() {
  const addStorageKey = "catalog-product-add";
  const removeStorageKey = "catalog-product-remove";
  let addInitial: CatalogProductSelection[] = [];
  let removeInitial: CatalogProductSelection[] = [];

  if (browser) {
    try {
      const savedAdd = localStorage.getItem(addStorageKey);
      if (savedAdd) addInitial = JSON.parse(savedAdd);
    } catch { addInitial = []; }
    try {
      const savedRemove = localStorage.getItem(removeStorageKey);
      if (savedRemove) removeInitial = JSON.parse(savedRemove);
    } catch { removeInitial = []; }
  }

  const addStore = writable<CatalogProductSelection[]>(addInitial);
  const removeStore = writable<CatalogProductSelection[]>(removeInitial);

  if (browser) {
    addStore.subscribe((value) => localStorage.setItem(addStorageKey, JSON.stringify(value)));
    removeStore.subscribe((value) => localStorage.setItem(removeStorageKey, JSON.stringify(value)));
  }

  function toggleAdd(productUuid: string) {
    addStore.update((items) => {
      const existing = items.findIndex((i) => i.productUuid === productUuid);
      if (existing >= 0) {
        return items.filter((i) => i.productUuid !== productUuid);
      }
      return [...items, { productUuid, order: 1 }];
    });
  }

  function toggleRemove(productUuid: string) {
    removeStore.update((items) => {
      const existing = items.findIndex((i) => i.productUuid === productUuid);
      if (existing >= 0) {
        return items.filter((i) => i.productUuid !== productUuid);
      }
      return [...items, { productUuid, order: 1 }];
    });
  }

  function isSelectedAdd(productUuid: string) {
    return get(addStore).some((i) => i.productUuid === productUuid);
  }

  function isSelectedRemove(productUuid: string) {
    return get(removeStore).some((i) => i.productUuid === productUuid);
  }

  function updateOrder(productUuid: string, order: number) {
    addStore.update((items) => {
      return items.map((i) => (i.productUuid === productUuid ? { ...i, order } : i));
    });
  }

  function clearAdd() {
    addStore.set([]);
  }

  function clearRemove() {
    removeStore.set([]);
  }

  function clearAll() {
    addStore.set([]);
    removeStore.set([]);
  }

  function getAddUuids(): string[] {
    return get(addStore).map((i) => i.productUuid);
  }

  function getRemoveUuids(): string[] {
    return get(removeStore).map((i) => i.productUuid);
  }

  return {
    add: { subscribe: addStore.subscribe, toggle: toggleAdd, isSelected: isSelectedAdd, clear: clearAdd, getUuids: getAddUuids, updateOrder },
    remove: { subscribe: removeStore.subscribe, toggle: toggleRemove, isSelected: isSelectedRemove, clear: clearRemove, getUuids: getRemoveUuids },
    clearAll,
  };
}

export const catalogProductStore = createCatalogProductStore();
