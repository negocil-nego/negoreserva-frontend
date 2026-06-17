<script lang="ts">
    import {page} from "$app/state";
    import {useGetProductDetail} from "$lib/feature/pub/product";
    import ProductPreviewDetail from "$lib/feature/org/product/ui/detail/product-preview-detail.svelte";
    import ProductPaymentDrawer from "$lib/feature/org/product/ui/product-payment-drawer.svelte";
    import {ProductManage} from "$lib/feature/pub/product/data/service/product.service";

    const slug = page.params.slug ?? ""

    const productQuery = useGetProductDetail({
        service: new ProductManage(),
        get uuidOrSlug() {
            return slug ?? ""
        },
    });

    let data = $derived($productQuery?.data);
    let isLoading = $derived($productQuery?.isLoading);
</script>
{#if isLoading }


{:else if data}
    <div class="relative">
        <ProductPreviewDetail {data}/>
        <div class="absolute bottom-1">
            <ProductPaymentDrawer {data}/>
        </div>
    </div>
{/if}