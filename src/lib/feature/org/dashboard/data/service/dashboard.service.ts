import { apolloClient } from "$lib/providers/graphql.provider";
import {
  DASHBOARD_TOTALS,
  DASHBOARD_CATALOGS_WITH_COUNT,
  DASHBOARD_PAYMENTS_BY_STATUS,
  DASHBOARD_PAYMENTS_BY_METHOD,
  DASHBOARD_RECENT_PAYMENTS,
  DASHBOARD_RECENT_PRODUCTS,
  DASHBOARD_RECENT_CATALOGS,
} from "../queries/dashboard";

export interface DashboardTotals {
  totalProducts: number;
  totalPayments: number;
  totalCatalogs: number;
}

export interface DashboardPaymentByStatus {
  paymentStatus: string;
  count: number;
}

export interface DashboardPaymentByMethod {
  paymentMethod: string;
  count: number;
}

export interface DashboardCatalogWithProductCount {
  uuid: string;
  name: string;
  description: string;
  imgUrl?: string | null;
  slug: string;
  productCount: number;
}

export class DashboardService {
  async getTotals(): Promise<DashboardTotals> {
    const { data } = await apolloClient.query<{ orgDashboardTotals: DashboardTotals }>({
      query: DASHBOARD_TOTALS,
    });
    return data!.orgDashboardTotals;
  }

  async getCatalogsWithProductCount(): Promise<DashboardCatalogWithProductCount[]> {
    const { data } = await apolloClient.query<{ orgDashboardCatalogsWithProductCount: DashboardCatalogWithProductCount[] }>({
      query: DASHBOARD_CATALOGS_WITH_COUNT,
    });
    return data!.orgDashboardCatalogsWithProductCount;
  }

  async getRecentPayments(pageSize = 5): Promise<any[]> {
    const { data } = await apolloClient.query<{ orgDashboardRecentPayments: any[] }>({
      query: DASHBOARD_RECENT_PAYMENTS,
      variables: { pageSize },
    });
    return data!.orgDashboardRecentPayments;
  }

  async getRecentProducts(pageSize = 5): Promise<any[]> {
    const { data } = await apolloClient.query<{ orgDashboardRecentProducts: any[] }>({
      query: DASHBOARD_RECENT_PRODUCTS,
      variables: { pageSize },
    });
    return data!.orgDashboardRecentProducts;
  }

  async getRecentCatalogs(pageSize = 5): Promise<any[]> {
    const { data } = await apolloClient.query<{ orgDashboardRecentCatalogs: any[] }>({
      query: DASHBOARD_RECENT_CATALOGS,
      variables: { pageSize },
    });
    return data!.orgDashboardRecentCatalogs;
  }

  async getPaymentsByStatus(): Promise<DashboardPaymentByStatus[]> {
    const { data } = await apolloClient.query<{ orgDashboardPaymentsByStatus: DashboardPaymentByStatus[] }>({
      query: DASHBOARD_PAYMENTS_BY_STATUS,
    });
    return data!.orgDashboardPaymentsByStatus;
  }

  async getPaymentsByMethod(): Promise<DashboardPaymentByMethod[]> {
    const { data } = await apolloClient.query<{ orgDashboardPaymentsByMethod: DashboardPaymentByMethod[] }>({
      query: DASHBOARD_PAYMENTS_BY_METHOD,
    });
    return data!.orgDashboardPaymentsByMethod;
  }
}
