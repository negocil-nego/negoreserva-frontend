<script lang="ts">
    import type {
        CategoryFilterQueryParamInput,
        CategoryResponse
    } from "$lib/feature/shared/category/model/category.model";
    import {usePubGetCategoryFilterPaginate} from "../data/hooks/use-get-filter-paginate";
    import {CategoryManage} from "../data/service/category.service";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import CategoryItem from "./category-item.svelte";
    import {categorySelectedStore} from "$lib/stores/category.store";
    import {ROUTE_SEARCH_ORGANIZATION} from "$lib/data/route";
    import {goto} from "$app/navigation";

    const service = new CategoryManage();

    type Props = { isRedirect?: boolean; isInline?: boolean };

    let { isRedirect = false, isInline = false}: Props = $props()

    const filter = $state<CategoryFilterQueryParamInput>({
        field: "ALL",
        search: "",
        pageNumber: 0,
        pageSize: 10,
    });

    const query = usePubGetCategoryFilterPaginate({service, filter});

    const isLoading = $derived($query.isLoading);
    const categories = $derived($query.data?.content ?? []);
    const selects = $derived($categorySelectedStore);

    const ALL = $derived({
        icon: 'hgi hgi-stroke hgi-rounded hgi-dashboard-square-01',
        name: 'Todos',
        description: 'Todas categorias'
    } as CategoryResponse)

    const isSelected = (category: CategoryResponse): boolean => {
        return selects.find(it => it.name == category.name) != null;
    }

    const onChange = (category: CategoryResponse) => {
        if (category.name === ALL.name) {
            categorySelectedStore.clear();
        } else {
            categorySelectedStore.toggle(category);
        }
        if(isRedirect) goToSearch();
    }

    const goToSearch = () => {
        goto(ROUTE_SEARCH_ORGANIZATION);
    }
</script>

{#if isLoading}
    <p>Cargando...</p>
{:else if categories.length === 0}
    <p>Não há categorias</p>
{:else}
    <div class="w-full pb-2 relative">
        <Carousel.Root class="w-full relative flex items-center">
            <Carousel.Content class="flex-1 w-screen">
                <Carousel.Item class="basis-auto cursor-pointer">
                    <CategoryItem category={ALL} {onChange} isSelected={selects.length == 0} {isInline}/>
                </Carousel.Item>
                {#each categories as category (category.uuid)}
                    <Carousel.Item class="basis-auto cursor-pointer">
                        <CategoryItem isSelected={isSelected(category)} {category} {onChange} {isInline}/>
                    </Carousel.Item>
                {/each}
            </Carousel.Content>
        </Carousel.Root>
    </div>
{/if}
