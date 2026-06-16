<script lang="ts">
    import ControlButtons from "./control-buttons.svelte";
</script>
<aside class="flex items-center gap-2 md:gap-4 lg:gap-6">
    <div>
      <ul class="flex gap-5 items-center justify-center">
        <li class="cursor-pointer hover:text-foreground transition-colors hidden md:block ">
          <a href="#">Início</a>
        </li>
      </ul>
    </div>
    <div class="ml-2 md:ml-0">
      <ControlButtons />
    </div>
  </aside>