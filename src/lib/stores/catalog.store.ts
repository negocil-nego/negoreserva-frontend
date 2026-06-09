import { browser } from "$app/environment";
import { derived, get, writable } from "svelte/store";
import type { CatalogResponse, ProductPriceGetOrgResponse } from "$lib/feature/pub/organization/data/model/organization.model";
import type { ProductDetailResponse } from "$lib/feature/pub/product";

export interface CatalogCartProduct {
    catalogUuid: string;
    catalogSlug: string;
    catalogName: string;
    organizationUuid: string;
    organizationSlug: string;
    organizationName: string;
    productUuid: string;
    productName: string;
    productDescription?: string | null;
    image?: string | null;
    price?: ProductPriceGetOrgResponse | null;
    quantity: number;
}

function createCatalogStore() {
    const storageKey = "catalog-cart-items";
    let initialValue: CatalogCartProduct[] = [];

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

    const store = writable<CatalogCartProduct[]>(initialValue);

    if (browser) {
        store.subscribe((value) => {
            localStorage.setItem(storageKey, JSON.stringify(value));
        });
    }

    function addProduct(params: {
        catalog: CatalogResponse;
        product: ProductDetailResponse;
        quantity: number;
        image?: string | null;
        price?: ProductPriceGetOrgResponse | null;
    }) {
        const quantity = Math.max(1, params.quantity);
        const organization = params.product.organization;
        const priceUuid = params.price?.uuid ?? "no-price";

        store.update((items) => {
            const index = items.findIndex((item) =>
                item.catalogUuid === params.catalog.uuid &&
                item.productUuid === params.product.uuid &&
                (item.price?.uuid ?? "no-price") === priceUuid
            );

            const nextItem: CatalogCartProduct = {
                catalogUuid: params.catalog.uuid,
                catalogSlug: params.catalog.slug,
                catalogName: params.catalog.name,
                organizationUuid: organization.uuid,
                organizationSlug: organization.slug,
                organizationName: organization.name,
                productUuid: params.product.uuid,
                productName: params.product.name,
                productDescription: params.product.description,
                image: params.image,
                price: params.price,
                quantity,
            };

            if (index >= 0) {
                return items.map((item, itemIndex) => itemIndex === index ? nextItem : item);
            }

            return [...items, nextItem];
        });
    }

    function removeProduct(catalogUuid: string, productUuid: string, priceUuid?: string | null) {
        store.update((items) => items.filter((item) => {
            const sameCatalog = item.catalogUuid === catalogUuid;
            const sameProduct = item.productUuid === productUuid;
            const samePrice = (item.price?.uuid ?? "no-price") === (priceUuid ?? "no-price");
            return !(sameCatalog && sameProduct && samePrice);
        }));
    }

    function updateQuantity(catalogUuid: string, productUuid: string, quantity: number, priceUuid?: string | null) {
        store.update((items) => items.map((item) => {
            const sameCatalog = item.catalogUuid === catalogUuid;
            const sameProduct = item.productUuid === productUuid;
            const samePrice = (item.price?.uuid ?? "no-price") === (priceUuid ?? "no-price");
            return sameCatalog && sameProduct && samePrice ? { ...item, quantity: Math.max(1, quantity) } : item;
        }));
    }

    function clear() {
        store.set([]);
    }

    function getItems() {
        return get(store);
    }

    return {
        subscribe: store.subscribe,
        addProduct,
        removeProduct,
        updateQuantity,
        clear,
        getItems,
    };
}

export const catalogStore = createCatalogStore();
export const catalogCartCount = derived(catalogStore, ($items) => $items.reduce((total, item) => total + item.quantity, 0));
export const catalogCartTotal = derived(catalogStore, ($items) =>
    $items.reduce((total, item) => total + ((item.price?.value ?? 0) * item.quantity), 0)
);
