<script lang="ts">
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import {ROUTE_SEARCH_ORGANIZATION, ROUTE_SEARCH_PRODUCT, ROUTE_SEARCH_CATALOG} from "$lib/data/route";
    import {ArrowDown01Icon} from "@hugeicons/core-free-icons";
    import { HugeiconsIcon } from "@hugeicons/svelte";
    import ControlButtons from "./control-buttons.svelte";
</script>
<aside class="flex items-center gap-2 md:gap-4">
    <div>
      <ul class="flex gap-5 items-center justify-center">
        <li class="cursor-pointer hover:text-foreground transition-colors hidden md:block ">
          <a href="/">Início</a>
        </li>
        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger class="flex items-center gap-1">
              Pesquisar
              <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={16}
                      strokeWidth={1}
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start">
              <DropdownMenu.Item class="cursor-pointer">
                <a href={ROUTE_SEARCH_ORGANIZATION}>Empresa</a>
              </DropdownMenu.Item>
              <DropdownMenu.Item class="cursor-pointer">
                <a href={ROUTE_SEARCH_PRODUCT}>Produto</a>
              </DropdownMenu.Item>
              <DropdownMenu.Item class="cursor-pointer">
                <a href={ROUTE_SEARCH_CATALOG}>Catalógo</a>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </li>
      </ul>
    </div>
    <div class="ml-2 md:ml-0">
      <ControlButtons />
    </div>
  </aside>