<script lang="ts">
  import OrganizationPanel from "$lib/feature/pub/organization/ui/organization-panel.svelte";
  import type {OrganizationDetailResponse} from "$lib/feature/pub/organization";
  let { data }: { data: OrganizationDetailResponse } = $props();
</script>


<OrganizationPanel name={data.name} image={data.image} logo={data.logo}/>