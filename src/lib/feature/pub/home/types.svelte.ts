import {City02Icon, DashboardSquare02Icon, ProductLoadingIcon} from "@hugeicons/core-free-icons";


export type SearchType = { value: string, name: string; icon: any; }

export const SEARCH_ALL: SearchType =  { value: 'all', name: 'Todos', icon: DashboardSquare02Icon }
export const SEARCH_ORG: SearchType =  { value: 'organization', name: 'Organização', icon: City02Icon }
export const SEARCH_PRODUCT: SearchType =  { value: 'product', name: 'Produto', icon: ProductLoadingIcon };

export const searchMap: Record<string, SearchType> = {
    all: SEARCH_ALL,
    product: SEARCH_PRODUCT,
    organization: SEARCH_ORG
};

export const searchItems = [SEARCH_ALL, SEARCH_ORG, SEARCH_PRODUCT];
