<script lang="ts">
    import type {
        CategoryFilterQueryParamInput,
        CategoryResponse,
    } from "$lib/feature/shared/category/model/category.model";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { searchFilterStore } from "$lib/stores/search-filter.store";
    import { ROUTE_SEARCH_ORGANIZATION } from "$lib/data/route";
    import { goto } from "$app/navigation";
    import { CategoryManage } from "$lib/feature/pub/category/data/service/category.service";
    import { usePubGetCategoryFilterPaginate } from "$lib/feature/pub/category/data/hooks/use-get-filter-paginate";
    import CategoryItem from "../category/ui/category-item.svelte";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

    const service = new CategoryManage();

    type Props = { isRedirect?: boolean };

    let { isRedirect = false }: Props = $props();

    const filter = $state<CategoryFilterQueryParamInput>({
        field: "ALL",
        search: "",
        pageNumber: 0,
        pageSize: 10,
    });

    const query = usePubGetCategoryFilterPaginate({ service, filter });

    const isLoading = $derived($query.isLoading);
    const categories = $derived($query.data?.content ?? []);
    const selects = $derived($searchFilterStore);

    const ALL = $derived({
        icon: "hgi hgi-stroke hgi-rounded hgi-dashboard-square-01",
        name: "Todos",
        description: "Todas categorias",
    } as CategoryResponse);

    const isSelected = (category: CategoryResponse): boolean => {
        return selects.categoryUuids.find((it) => it == category.uuid) != null;
    };

    const onChange = (category: CategoryResponse) => {
        if (category.name === ALL.name) {
            searchFilterStore.clearCategory();
        } else {
            searchFilterStore.toggleCategory(category.uuid);
        }
        if (isRedirect) goToSearch();
    };

    const goToSearch = () => {
        // eslint-disable-next-line svelte/no-navigation-without-resolve
        goto(ROUTE_SEARCH_ORGANIZATION);
    };
</script>

<div class="container">
    {#if isLoading}
        <div class="w-full flex justify-center gap-3 overflow-x-auto mt-3">
            {#each Array.from({ length: 8 }, (_, i) => i) as i (i)}
                <Skeleton class="h-5 w-16 " />
            {/each}
        </div>
    {:else if categories.length > 0}
        <div class="py-3 md:py-5 relative md:my-5">
            <Carousel.Root class="w-full relative flex items-center">
                <Carousel.Content class="flex-1 w-screen">
                    <Carousel.Item class="basis-auto cursor-pointer">
                        <CategoryItem
                            category={ALL}
                            {onChange}
                            isSelected={selects.categoryUuids.length == 0}
                        />
                    </Carousel.Item>
                    {#each categories as category (category.uuid)}
                        <Carousel.Item class="basis-auto cursor-pointer">
                            <CategoryItem
                                isSelected={isSelected(category)}
                                {category}
                                {onChange}
                            />
                        </Carousel.Item>
                    {/each}
                </Carousel.Content>
            </Carousel.Root>
        </div>
    {/if}
</div>
