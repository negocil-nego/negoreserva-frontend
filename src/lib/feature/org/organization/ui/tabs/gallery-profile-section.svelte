<script lang="ts">
  import { Image01Icon, Video01Icon } from "@hugeicons/core-free-icons";
  import type { OrgOrganizationProfile } from "../../data/model/organization";
  import ProfileUploadRow from "$lib/feature/shared/user/ui/profile-upload-row.svelte";
  import { useOrgOrganizationUpdateLogo } from "../../data/hooks/use-org-organization-update-logo";
  import { useOrgOrganizationUpdateImage } from "../../data/hooks/use-org-organization-update-image";
  import { useOrgOrganizationUpdateVideo } from "../../data/hooks/use-org-organization-update-video";
  import { OrgOrganizationService } from "../../data/service/organization.service";

  let { data }: { data: OrgOrganizationProfile } = $props();

  const service = new OrgOrganizationService();

  let updateLogoMutation = useOrgOrganizationUpdateLogo({ service });
  let updateImageMutation = useOrgOrganizationUpdateImage({ service });
  let updateVideoMutation = useOrgOrganizationUpdateVideo({ service });

  const handleLogoChange = async (file: File) => {
    await $updateLogoMutation.mutateAsync(file);
  };

  const handleImageChange = async (file: File) => {
    await $updateImageMutation.mutateAsync(file);
  };

  const handleVideoChange = async (file: File) => {
    await $updateVideoMutation.mutateAsync(file);
  };
</script>

<div>
  <div class="px-4 sm:px-0 hidden">
    <h3 class="text-base/7 font-semibold text-foreground">Galeria</h3>
    <p class="mt-1 max-w-2xl text-sm/6 text-muted-foreground">
      Gerencie a identidade visual e o conteúdo multimédia que representam a sua
      organização.
    </p>
  </div>
  <div class="mt-6 border-t border-border">
    <div class="divide-y divide-border">
      <ProfileUploadRow
        label="Logótipo"
        subLabel="A identidade principal da marca. Recomenda-se uma imagem quadrada (1:1), preferencialmente em PNG com fundo transparente ou SVG para melhor resolução."
        icon={Image01Icon}
        value={data.organization.logo}
        accept="image/*"
        fileType="image"
        onsubmit={handleLogoChange}
      />
      <ProfileUploadRow
        label="Imagem de Capa"
        subLabel="Este é o banner principal da sua página. Utilize uma imagem panorâmica (16:9) de alta qualidade para garantir que a sua marca se destaque em todos os dispositivos."
        icon={Image01Icon}
        value={data.organization.image}
        accept="image/*"
        fileType="image"
        onsubmit={handleImageChange}
      />
      <ProfileUploadRow
        label="Vídeo de Apresentação"
        subLabel="Um breve vídeo para captar a atenção (máx. 30s). Ideal para mostrar a essência da organização ou um resumo rápido do que oferece."
        icon={Video01Icon}
        value={data.organization.video}
        accept="video/*"
        fileType="video"
        onsubmit={handleVideoChange}
      />
    </div>
  </div>
</div>
