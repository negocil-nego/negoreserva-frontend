<script lang="ts">
  import type { OrgOrganizationProfile } from "$lib/feature/org/organization/data/model/organization";
  import ProfileInfoRow from "./profile-info-row.svelte";

  let {
    data,
    type,
    title,
    description,
  }: {
    data: OrgOrganizationProfile;
    type: "user" | "organization";
    title: string;
    description: string;
  } = $props();

  const fields = $derived(
    type === "user"
      ? [
          { label: "Nome", value: data.user.name },
          { label: "Email", value: data.user.email },
          { label: "Telefone", value: data.user.phone },
        ]
      : [
          { label: "Nome", value: data.organization.name },
          { label: "Email", value: data.organization.email },
          { label: "Telefone", value: data.organization.phone },
          { label: "Descrição", value: data.organization.description },
          { label: "Endereço", value: data.organization.address },
        ],
  );
</script>

<div>
  <div class="px-4 sm:px-0">
    <div class="text-base/7 font-semibold text-foreground">{title}</div>
    <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">{description}</p>
  </div>
  <div class="mt-6 border-t border-border">
    <dl class="divide-y divide-border">
      {#each fields as field (field.label)}
        <ProfileInfoRow label={field.label} value={field.value} />
      {/each}
    </dl>
  </div>
</div>
