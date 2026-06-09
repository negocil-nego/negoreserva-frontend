<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";

  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    City01Icon,
    Login02Icon,
    Menu01Icon, UserAdd01Icon,
  } from "@hugeicons/core-free-icons";
  import {ROUTE_SIGNING, ROUTE_SIGNUP_CLIENT, ROUTE_SIGNUP_ORGANIZATION} from "$lib/data/route";
  import { resolve } from "$app/paths";
  import DropdownTheme from "$lib/components/theme/dropdown-theme.svelte";
    import { buttonVariants } from "../ui/button/button.svelte";
</script>

<Drawer.Root direction="right">
  <Drawer.Trigger
    class={buttonVariants({
      variant: "outline",
      size: "icon",
      class: "cursor-pointer"
    })}
  >
    <HugeiconsIcon icon={Menu01Icon} color="currentColor" />
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Navegação</Drawer.Title>
      <Drawer.Description>Escolha uma opção</Drawer.Description>
    </Drawer.Header>

    <div>
      <div class="p-3">Conta</div>
      <ul class="p-3 space-y-5">
        <li>
          <a
            href={resolve(ROUTE_SIGNING as any)}
            class="flex items-center gap-5"
          >
            <HugeiconsIcon icon={Login02Icon} color="currentColor" />
            <span>Entrar</span>
          </a>
        </li>
      </ul>
    </div>

    <div>
      <div class="p-3">Cadastro</div>
      <ul class="p-3 space-y-5">
        <li>
          <a href={resolve(ROUTE_SIGNUP_CLIENT as any)} class="flex items-center gap-5">
            <HugeiconsIcon icon={UserAdd01Icon} color="currentColor" />
            <span>Cliente</span>
          </a>
        </li>
        <li>
          <a href={resolve(ROUTE_SIGNUP_ORGANIZATION as any)} class="flex items-center gap-5">
            <HugeiconsIcon icon={City01Icon} color="currentColor" />
            <span>Empresa</span>
          </a>
        </li>
      </ul>
    </div>

    <div>
      <div class="p-3">Seleciona o tema</div>
      <div class="flex items-center gap-5 p-3">
        <DropdownTheme/>
        <div>Tema</div>
      </div>
    </div>

    <Drawer.Footer>
      <Drawer.Close>Fechar</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
