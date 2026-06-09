<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from '$app/state';

  const canGoBack = $derived(
          typeof window !== "undefined" && history.length > 1
  );

  function goBack() {
    const referrer = page.url.searchParams.get("from");
    if (referrer) {
      goto(referrer);
    } else if (canGoBack) {
      history.back();
    } else {
      goto("/");
    }
  }
</script>

<button
        onclick={goBack}
        class="text-lg flex items-center font-extrabold focus:outline-none focus:ring-2 focus:ring-green-500 rounded cursor-pointer"
>
  <span class="text-green-500 font-bold">NEGO</span>
  <span class="text-green-800">RESERVA</span>
</button>