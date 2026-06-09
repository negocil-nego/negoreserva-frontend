import { resolve } from "$app/paths";
import { browser } from "$app/environment";
import { USER_AUTH_TOKEN_KEY } from "./variables";
import { ROUTE_SIGNING } from "./route";

export const redirectToLogin = () => {
    if (!browser) return;
    localStorage.removeItem(USER_AUTH_TOKEN_KEY);
    window.location.href = resolve(ROUTE_SIGNING);
};