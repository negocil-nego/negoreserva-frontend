<script lang="ts">
	import { Popover } from "bits-ui";
	import { Input } from "$lib/components/ui/input/index.js";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { icons, type IconEntry } from "./icons-data.js";

	let {
		value = $bindable(""),
	} = $props();

	let search = $state("");
	let selectedCategory = $state("all");
	let isOpen = $state(false);

	let categories = $derived(
		[...new Set(icons.map((i) => i.category))].sort()
	);

	let filteredIcons = $derived.by(() => {
		let result: IconEntry[];
		if (selectedCategory === "all") {
			result = icons;
		} else {
			result = icons.filter((i) => i.category === selectedCategory);
		}
		if (!search.trim()) return result;
		const q = search.toLowerCase().trim();
		return result.filter((i) => i.name.includes(q));
	});

	let selectedIcon = $derived(icons.find((i) => i.name === value));

	function selectIcon(name: string) {
		value = name;
		isOpen = false;
	}
</script>

<Popover.Root bind:open={isOpen}>
	<Popover.Trigger
		class={buttonVariants({ variant: "outline", size: "icon-lg" })}
	>
		{#if selectedIcon}
			<i class={selectedIcon.class} style="font-size: 20px;"></i>
		{:else}
			<i class="hgi-stroke hgi-add-01" style="font-size: 20px;"></i>
		{/if}
	</Popover.Trigger>

	<Popover.Content
		class={cn(
			"bg-popover text-popover-foreground z-50 w-[420px] rounded-2xl border p-4 shadow-md outline-none",
			"data-[state=open]:data-[side=top]:animate-in data-[state=open]:data-[side=bottom]:animate-in",
			"data-[state=open]:data-[side=left]:animate-in data-[state=open]:data-[side=right]:animate-in"
		)}
		align="start"
	>
		<div class="space-y-3">
			<Input bind:value={search} placeholder="Search icons..." />

			<div class="flex flex-wrap gap-1.5">
				<button
					type="button"
					class={buttonVariants({
						variant: selectedCategory === "all" ? "default" : "ghost",
						size: "xs",
					})}
					onclick={() => (selectedCategory = "all")}
				>
					All
				</button>
				{#each categories as cat (cat)}
					<button
						type="button"
						class={buttonVariants({
							variant: selectedCategory === cat ? "default" : "ghost",
							size: "xs",
						})}
						onclick={() => (selectedCategory = cat)}
					>
						{cat}
					</button>
				{/each}
			</div>

			<div class="grid max-h-64 grid-cols-8 gap-1 overflow-y-auto">
				{#each filteredIcons as icon (icon.name)}
					<button
						type="button"
						class="flex size-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-accent {value === icon.name ? 'bg-accent ring-ring ring-2' : ''}"
						title={icon.name}
						onclick={() => selectIcon(icon.name)}
					>
						<i class={icon.class} style="font-size: 20px;"></i>
					</button>
				{/each}
			</div>

			<div class="text-muted-foreground border-t pt-2 text-xs">
				{filteredIcons.length} icons
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
