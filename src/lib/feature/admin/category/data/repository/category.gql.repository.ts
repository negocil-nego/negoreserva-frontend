import { apolloClient } from "$lib/providers/graphql.provider";
import {
    PAGINATE_CATEGORY,
    PAGINATE_CATEGORY_FILTER,
    FIND_BY_UUID_CATEGORY,
    FIND_BY_NAME_CATEGORY,
    SAVE_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_BY_UUID_CATEGORY
} from "$lib/feature/admin/category/data/queries/category";
import type { IAdminCategoryRepository } from "../contract/category.repository";
import type {
    CategoryResponse,
    CategoryPaginate,
    CategoryRequest,
    CategoryFilterQueryParamInput,
    PaginateRequest
} from "../../../../shared/category/model/category.model";

export class CategoryGqlRepository implements IAdminCategoryRepository {

    async paginate(request: PaginateRequest): Promise<CategoryPaginate> {
        const { data } = await apolloClient.query<{ adminPaginateCategory: CategoryPaginate }>({
            query: PAGINATE_CATEGORY,
            variables: { paginateRequest: request }
        });
        return data!.adminPaginateCategory;
    }

    async paginateCategoryFilter(filter: CategoryFilterQueryParamInput): Promise<CategoryPaginate> {
        const { data } = await apolloClient.query<{ adminPaginateCategoryFilter: CategoryPaginate }>({
            query: PAGINATE_CATEGORY_FILTER,
            variables: { filter }
        });
        return data!.adminPaginateCategoryFilter;
    }

    async findByUuid(uuid: string): Promise<CategoryResponse> {
        const { data } = await apolloClient.query<{ adminFindByUuidCategory: CategoryResponse }>({
            query: FIND_BY_UUID_CATEGORY,
            variables: { uuid }
        });
        return data!.adminFindByUuidCategory;
    }

    async findByName(name: string): Promise<CategoryResponse> {
        const { data } = await apolloClient.query<{ adminFindByNameCategory: CategoryResponse }>({
            query: FIND_BY_NAME_CATEGORY,
            variables: { name }
        });
        return data!.adminFindByNameCategory;
    }

    async save(request: CategoryRequest): Promise<CategoryResponse> {
        const { data } = await apolloClient.mutate<{ adminSaveCategory: CategoryResponse }>({
            mutation: SAVE_CATEGORY,
            variables: { categoryRequest: request }
        });
        return data!.adminSaveCategory;
    }

    async update(uuid: string, request: CategoryRequest): Promise<CategoryResponse> {
        const { data } = await apolloClient.mutate<{ adminUpdateCategory: CategoryResponse }>({
            mutation: UPDATE_CATEGORY,
            variables: { uuid, categoryRequest: request }
        });
        return data!.adminUpdateCategory;
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        const { data } = await apolloClient.mutate<{ adminDeleteByUuidCategory: boolean }>({
            mutation: DELETE_BY_UUID_CATEGORY,
            variables: { uuid }
        });
        return data!.adminDeleteByUuidCategory;
    }
}
