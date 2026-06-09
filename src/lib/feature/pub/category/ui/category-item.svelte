<script lang="ts">
  import type {CategoryResponse} from "$lib/feature/shared/category/model/category.model";

  type Props = {
    isLoading?: boolean,
    isSelected?: boolean,
    isInline?: boolean,
    category: CategoryResponse,
    onChange: (category: CategoryResponse) => void,
  }
  let {
    isLoading = false,
    isSelected = false,
    isInline = false,
    category,
    onChange,
  }: Props= $props()
</script>

<div class="p-1 text-center min-w-20  text-sm dark:bg-transparent"
>
  <button disabled={isLoading}
          onclick={() => { onChange(category) }}
          class="{isSelected ? 'text-green-800 font-extrabold' : ''} {isInline ? 'flex items-center gap-1 border p-1 rounded-xl bg-panel px-2' : ''}"
  >
    <i class="{category.icon ?? 'hgi-a-access'} text-xl lg:text-2xl"></i>
    <div>{category.name}</div>
  </button>
</div>