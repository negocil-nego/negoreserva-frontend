<script lang="ts">
  import type {CategoryResponse} from "$lib/feature/shared/category/model/category.model";

  type Props = {
    isLoading?: boolean,
    isSelected?: boolean,
    category: CategoryResponse,
    onChange: (category: CategoryResponse) => void,
  }
  let {
    isLoading = false,
    isSelected = false,
    category,
    onChange,
  }: Props= $props()
</script>

<div class="text-center min-w-20 text-sm dark:bg-transparent"
>
  <button disabled={isLoading}
          onclick={() => { onChange(category) }}
          class="{isSelected ? 'font-extrabold bg-black/50 px-2 rounded-full' : ''} flex flex-row items-center gap-2"
  >
    <i class="{category.icon ?? 'hgi-a-access'} "></i>
    <div>{category.name}</div>
  </button>
</div>