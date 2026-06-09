import { gql } from "@apollo/client/core";

export const PAGINATE_PLAN = gql`
  query adminPaginatePlan($paginateRequest: PaginateRequest) {
    adminPaginatePlan(paginateRequest: $paginateRequest) {
      content {
        uuid
        name
        price
        description
        type
      }
      empty
      first
      last
      number
      numberOfElements
      size
      totalElements
      totalPages
    }
  }
`;

export const PAGINATE_PLAN_FILTER = gql`
  query adminPaginatePlanFilter($filter: PlanFilterQueryParamInput) {
    adminPaginatePlanFilter(filter: $filter) {
      content {
        uuid
        name
        price
        description
        type
      }
      empty
      first
      last
      number
      numberOfElements
      size
      totalElements
      totalPages
    }
  }
`;

export const FIND_BY_UUID_PLAN = gql`
  query adminFindByUuidPlan($uuid: ID!) {
    adminFindByUuidPlan(uuid: $uuid) {
      uuid
      name
      price
      description
      type
    }
  }
`;

export const FIND_BY_NAME_PLAN = gql`
  query adminFindByNamePlan($name: ID!) {
    adminFindByNamePlan(name: $name) {
      uuid
      name
      price
      description
      type
    }
  }
`;

export const SAVE_PLAN = gql`
  mutation adminSavePlan($planRequest: PlanRequest!) {
    adminSavePlan(planRequest: $planRequest) {
      uuid
      name
      price
      description
      type
    }
  }
`;

export const UPDATE_PLAN = gql`
  mutation adminUpdatePlan($uuid: ID!, $planRequest: PlanRequest!) {
    adminUpdatePlan(uuid: $uuid, planRequest: $planRequest) {
      uuid
      name
      price
      description
      type
    }
  }
`;

export const DELETE_BY_UUID_PLAN = gql`
  mutation adminDeleteByUuidPlan($uuid: ID!) {
    adminDeleteByUuidPlan(uuid: $uuid)
  }
`;