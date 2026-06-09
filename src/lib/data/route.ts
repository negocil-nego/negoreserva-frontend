export const ROUTE_ORGANIZATION_PROFILE = "/dashboard/organization/profile";
export const ROUTE_CLIENT_PROFILE = "/dashboard/client/profile";
export const ROUTE_ADMIN_PROFILE = "/dashboard/admin/profile";

export const ROUTE_SIGNUP_ORGANIZATION = "/auth/signup/organization";
export const ROUTE_SIGNUP_CLIENT = "/auth/signup/client";
export const ROUTE_SIGNING = "/auth/signin";
export const ROUTE_HOME = "/";
export const ROUTE_SEARCH_ORGANIZATION = "/search/organization";
export const ROUTE_SEARCH_CATALOG = "/search/catalog";
export const ROUTE_SEARCH_PRODUCT = "/search/product";

export const routeNamed = {
    api: {
        base: "/",
    },
    public: {
        home: ROUTE_HOME,
        signin: ROUTE_SIGNING,
        signup: {
            client: ROUTE_SIGNUP_CLIENT,
            organization: ROUTE_SIGNUP_ORGANIZATION,
        },
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
        bookingOrganization: "/booking/:slug",
        bookingProduct: "/product/:slug",
        bookingProductFile: "/product-file/:slug",
        bookingProductSimple: "/product-simple/:slug",
        bookingOrganizationSimple: "/organization/:slug",
    },
    protected: {
        dashboard: "/dashboard",
        admin: "/admin",
    },
};