import { gql } from "@apollo/client/core";

export const DASHBOARD_TOTALS = gql`
  query orgDashboardTotals {
    orgDashboardTotals {
      totalProducts
      totalPayments
      totalCatalogs
    }
  }
`;

export const DASHBOARD_CATALOGS_WITH_COUNT = gql`
  query orgDashboardCatalogsWithProductCount {
    orgDashboardCatalogsWithProductCount {
      uuid
      name
      description
      imgUrl
      slug
      productCount
    }
  }
`;

export const DASHBOARD_RECENT_PAYMENTS = gql`
  query orgDashboardRecentPayments($pageSize: Int) {
    orgDashboardRecentPayments(pageSize: $pageSize) {
      uuid
      transaction {
        uuid
        code
        product {
          uuid
          name
          slug
          description
        }
        user {
          uuid
          name
          email
        }
        amount
        price
      }
      status
      type
    }
  }
`;

export const DASHBOARD_RECENT_PRODUCTS = gql`
  query orgDashboardRecentProducts($pageSize: Int) {
    orgDashboardRecentProducts(pageSize: $pageSize) {
      uuid
      name
      slug
      description
      files {
        uuid
        title
        description
        url
        type
      }
    }
  }
`;

export const DASHBOARD_RECENT_CATALOGS = gql`
  query orgDashboardRecentCatalogs($pageSize: Int) {
    orgDashboardRecentCatalogs(pageSize: $pageSize) {
      uuid
      name
      description
      imgUrl
      slug
    }
  }
`;

export const DASHBOARD_PAYMENTS_BY_STATUS = gql`
  query orgDashboardPaymentsByStatus {
    orgDashboardPaymentsByStatus {
      paymentStatus
      count
    }
  }
`;

export const DASHBOARD_PAYMENTS_BY_METHOD = gql`
  query orgDashboardPaymentsByMethod {
    orgDashboardPaymentsByMethod {
      paymentMethod
      count
    }
  }
`;
