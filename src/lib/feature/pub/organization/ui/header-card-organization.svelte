<script lang="ts">
    import {Location01FreeIcons} from "@hugeicons/core-free-icons";
    import TruncatedText from "$lib/components/truncated-text.svelte";
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import type {GetOrganizationResponse} from "$lib/feature/pub/organization";
    import SharedOrganizationButton from "./buttons/shared-organization-button.svelte";
    import FavouriteOrganizationButton from "./buttons/favourite-organization-button.svelte";

    type Props = { item: GetOrganizationResponse }
    let {item}: Props = $props();

</script>

<div class="relative w-full">
    <div class="flex items-center gap-2 my-2 md:my-0">
        <div class="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-600 overflow-hidden absolute top-0 md:relative">
            <img src={item.organization.logo}
                 alt={item.organization.name}
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-full cursor-pointer"
            />
        </div>
        <div class="ml-13 -mt-5 md:ml-0 md:mt-0">
            <div class="text-sm mt-2 md:mt-0">{item.organization.name}</div>
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-1 text-[10px] text-gray-800 dark:text-white my-1">
                    <HugeiconsIcon icon={Location01FreeIcons} size={15} color="currentColor"/>
                    <div class="text-truncate block md:hidden">
                        {item.organization.address}
                    </div>
                    <div class="hidden md:block">
                        <TruncatedText text={item.organization.address ?? ""} maxChars={30}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex gap-2 items-center px-1 justify-end absolute top-0 right-0">
        <SharedOrganizationButton/>
        <FavouriteOrganizationButton/>
    </div>
</div>