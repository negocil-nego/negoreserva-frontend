<script lang="ts">
  import type { OrganizationResponse } from "$lib/feature/pub/organization";
    import OrganizationPanel from "$lib/feature/pub/organization/ui/organization-panel.svelte";
  let { organization }: { organization: OrganizationResponse } = $props();
</script>

<OrganizationPanel name={organization.name} image={organization.image} logo={organization.logo} />
