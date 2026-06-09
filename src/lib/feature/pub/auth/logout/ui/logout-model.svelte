<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { LogoutService } from "$lib/feature/pub/auth/logout/data/service/logout.service";
  import { useLogout } from "$lib/feature/pub/auth/logout/data/hooks/use-logout";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    AlertTriangle,
    Logout01Icon,
    Loading03Icon,
  } from "@hugeicons/core-free-icons";

  const service = new LogoutService();
  const logoutMutation = useLogout({ service });
  let isLoading = $derived($logoutMutation.isLoading);

  function onSubmit() {
    $logoutMutation.mutateAsync();
  }
</script>

<Dialog.Root>
  <Dialog.Trigger
    type="button"
    class="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground w-full data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-red-500 ml-1"
  >
    <HugeiconsIcon icon={Logout01Icon} class="size-4" />
    Sair
  </Dialog.Trigger>

  <Dialog.Content class="sm:max-w-[400px] text-center">
    <Dialog.Header>
      <div class="flex justify-center mb-2">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-full bg-red-100"
        >
          <HugeiconsIcon icon={AlertTriangle} class="h-7 w-7 text-red-500" />
        </div>
      </div>

      <Dialog.Title class="text-center text-xl font-bold">
        Tem a certeza?
      </Dialog.Title>

      <Dialog.Description class="text-center text-sm text-muted-foreground">
        Esta ação irá encerrar a sua sessão. Terá de iniciar sessão novamente
        para continuar.
      </Dialog.Description>
    </Dialog.Header>

    <Dialog.Footer class="flex flex-col gap-2 mt-2 sm:flex-col">
      <Button
        type="button"
        disabled={isLoading}
        onclick={onSubmit}
        class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold"
      >
        {#if isLoading}
          <HugeiconsIcon
            icon={Loading03Icon}
            class="mr-2 h-4 w-4 animate-spin"
          />
          A sair...
        {:else}
          <HugeiconsIcon icon={Logout01Icon} class="mr-2 h-4 w-4" />
          Sair
        {/if}
      </Button>

      <Dialog.Close
        type="button"
        class={buttonVariants({ variant: "outline" }) + " w-full"}
      >
        Cancelar
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
