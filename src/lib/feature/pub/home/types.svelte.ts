import {City02Icon, DashboardSquare02Icon, ProductLoadingIcon} from "@hugeicons/core-free-icons";


export type SearchType = { name: string; icon: any; }

export const SEARCH_ALL: SearchType =  { name: 'Todos', icon: DashboardSquare02Icon }
export const SEARCH_ORG: SearchType =  { name: 'Organização', icon: City02Icon }
export const SEARCH_PRODUCT: SearchType =  { name: 'Producto', icon: ProductLoadingIcon };
