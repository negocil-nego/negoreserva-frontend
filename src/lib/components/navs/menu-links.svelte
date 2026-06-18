<script lang="ts">
  import { resolve } from "$app/paths";
  import ControlButtons from "./control-buttons.svelte";
</script>

<aside class="flex items-center gap-2 md:gap-4 lg:gap-6">
  <div>
    <ul class="flex gap-5 items-center justify-center">
      <li
        class="cursor-pointer hover:font-extrabold transition-colors hidden md:block"
      >
        <a href={resolve("/")}>Início</a>
      </li>
    </ul>
  </div>
  <div class="ml-2 md:ml-0">
    <ControlButtons />
  </div>
</aside>
