<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import InputPassword from "$lib/feature/pub/auth/input-password.svelte";
  import { useUserResetPasswordCurrent } from "$lib/feature/shared/user/data/hooks/use-user-reset-password-current";
  import { UserService } from "$lib/feature/shared/user/data/service/user.service";

  const service = new UserService();
  const resetPasswordMutation = useUserResetPasswordCurrent({ service });

  let currentPassword = $state("");
  let newPassword = $state("");
  let confirmPassword = $state("");

  let isLoading = $derived($resetPasswordMutation.isLoading);

  const isValid = $derived(
    currentPassword !== "" && newPassword !== "" && confirmPassword !== "",
  );

  function onSubmit() {
    if (!isValid || isLoading) return;
    $resetPasswordMutation.mutateAsync({
      current: currentPassword,
      password: newPassword,
      confirm: confirmPassword,
    });
  }
</script>

<div>
  <div class="px-4 sm:px-0 hidden">
    <h3 class="text-base/7 font-semibold text-foreground">Segurança</h3>
    <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">
      Altere a sua palavra-passe.
    </p>
  </div>
  <div class="mt-6 border-t border-border">
    <div class="divide-y divide-border">
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-muted-foreground">
          Palavra-passe Actual
        </dt>
        <dd class="mt-1 sm:col-span-2 sm:mt-0">
          <InputPassword
            bind:value={currentPassword}
            props={{ placeholder: "Palavra-passe actual" }}
          />
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-muted-foreground">
          Nova Palavra-passe
        </dt>
        <dd class="mt-1 sm:col-span-2 sm:mt-0">
          <InputPassword
            bind:value={newPassword}
            props={{ placeholder: "Nova palavra-passe" }}
          />
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-muted-foreground">
          Confirmar Nova Palavra-passe
        </dt>
        <dd class="mt-1 sm:col-span-2 sm:mt-0">
          <InputPassword
            bind:value={confirmPassword}
            props={{ placeholder: "Confirmar nova palavra-passe" }}
          />
        </dd>
      </div>
    </div>
  </div>
  <div class="flex justify-start">
    <Button class="bg-brand" onclick={onSubmit} disabled={isLoading}>
      Actualizar Palavra-passe
    </Button>
  </div>
</div>
