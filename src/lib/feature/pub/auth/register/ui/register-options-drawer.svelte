<script lang="ts">
    import * as Drawer from "$lib/components/ui/drawer/index.js";
    import Button, {
        buttonVariants,
    } from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import {browser} from "$app/environment";
    import {HugeiconsIcon} from "@hugeicons/svelte";
    import {
        User03Icon,
        UserEdit01Icon,
        City02Icon,
    } from "@hugeicons/core-free-icons";
    import {routeNamed} from "$lib/data/route";
    import {goto} from "$app/navigation";
    import {resolve} from "$app/paths";

    type Props = { isLabel?: boolean; }

    let {isLabel = false}: Props = $props();

    const items = [
        {
            title: "Conta Pessoal",
            description:
                "Ideal para quem quer encontrar e agendar serviços de forma rápida e simples, sem complicações.",
            icon: User03Icon,
            buttonClass: "bg-blue-500 dark:text-white",
            url: routeNamed.public.signup.client,
            buttonText: "Criar conta pessoal",
            items: [
                "Faça reservas de hoteis, hospedarias e alojamentos",
                "Faça reservas de restaurantes",
                "Faça encomenda dos seus fastfoods",
            ],
        },
        {
            title: "Conta Empresarial",
            description:
                "Perfeita para empresas e profissionais que pretendem gerir os seus serviços, acompanhar agendamentos e expandir o seu negócio de forma organizada e eficiente.",
            icon: City02Icon,
            buttonClass: "bg-green-500 dark:text-white",
            url: routeNamed.public.signup.organization,
            buttonText: "Criar conta empresarial",
            items: [
                "Publica e gere os teus serviços",
                "Controla agendamentos de clientes",
                "Acompanha a disponibilidade em tempo real",
                "Gestão completa da organização",
                "Cria menus eletrónicos personalizados",
            ],
        },
    ];

    const navigateTo = (url: string) => {
        if (browser) goto(resolve(url as any));
    }

</script>

<Drawer.Root direction="top">
    {#if isLabel }
        <Drawer.Trigger class={buttonVariants({ variant: "outline", class: "bg-brand cursor-pointer", })}>
            <HugeiconsIcon icon={UserEdit01Icon} color="currentColor"/>
            <span>Criar conta</span>
        </Drawer.Trigger>
    {:else }
        <Drawer.Trigger class={buttonVariants({ variant: "outline", size: "icon", class: "bg-background border-gray-900 cursor-pointer"})}>
            <HugeiconsIcon icon={UserEdit01Icon} color="currentColor"/>
        </Drawer.Trigger>
    {/if}
    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title>Cria a tua conta</Drawer.Title>
            <Drawer.Description
            >Escolhe o tipo de conta que melhor se adapta às tuas necessidades e
                começa a usar a plataforma hoje mesmo.
            </Drawer.Description
            >
        </Drawer.Header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            {#each items as item (item.title)}
                <Card.Root class="shadow-md">
                    <Card.Header>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Description>{item.description}</Card.Description>
                    </Card.Header>
                    <Card.Content class="space-y-2 h-6/12">
                        {#each item.items as text (text)}
                            <div class="flex items-center gap-2">
                                <div class={`w-2 h-2 rounded-full ${item.buttonClass}`}></div>
                                <div>{text}</div>
                            </div>
                        {/each}
                    </Card.Content>
                    <Card.Footer>
                        <Button
                                class={`w-full rounded-sm py-3 md:py-5 cursor-pointer ${item.buttonClass}`}
                                onclick={() => navigateTo(item.url) }
                        >
                            {item.buttonText}
                        </Button>
                    </Card.Footer>
                </Card.Root>
            {/each}
        </div>
    </Drawer.Content>
</Drawer.Root>
