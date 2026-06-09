<script>
    import {
        PHOTO_SIGNING_STEP1,
        PHOTO_SIGNING_STEP2,
        PHOTO_SIGNUP_CLIENT_STEP1, PHOTO_SIGNUP_CLIENT_STEP2, PHOTO_SIGNUP_CLIENT_STEP3,
        PHOTO_SIGNUP_ORGANIZATION_STEP1,
        PHOTO_SIGNUP_ORGANIZATION_STEP2
    } from "$lib/data/variables";
    import { onMount, onDestroy } from 'svelte';

    const allPhotos = [
        PHOTO_SIGNUP_CLIENT_STEP2,
        PHOTO_SIGNUP_CLIENT_STEP3,
        PHOTO_SIGNUP_CLIENT_STEP1,
        PHOTO_SIGNING_STEP1,
        PHOTO_SIGNING_STEP2,
        PHOTO_SIGNUP_ORGANIZATION_STEP1,
        PHOTO_SIGNUP_ORGANIZATION_STEP2,
    ];

    /** @param {string[]} pool */
    function getUniquePhotos(pool) {
        return [...pool].sort(() => Math.random() - 0.5).slice(0, 7);
    }

    let currentPhotos = $state(getUniquePhotos(allPhotos));
    let fadingSlots = $state(/** @type {Set<number>} */ (new Set()));

    /** @type {ReturnType<typeof setTimeout>[]} */
    let timers = [];

    /**
     * @param {number} excludeIndex
     */
    function getNextPhoto(excludeIndex) {
        const usedSet = new Set(currentPhotos);
        const available = allPhotos.filter(p => !usedSet.has(p));

        const pool = available.length > 0
            ? available
            : allPhotos.filter(p => p !== currentPhotos[excludeIndex]);

        return pool[Math.floor(Math.random() * pool.length)];
    }

    /**
     * @param {number} slotIndex
     */
    function scheduleSlot(slotIndex) {
        const delay = 2000 + Math.random() * 4000;

        const t = setTimeout(() => {
            fadingSlots = new Set([...fadingSlots, slotIndex]);

            const t2 = setTimeout(() => {
                const newPhoto = getNextPhoto(slotIndex);
                currentPhotos = currentPhotos.map((p, i) => i === slotIndex ? newPhoto : p);
                fadingSlots = new Set([...fadingSlots].filter(s => s !== slotIndex));
                scheduleSlot(slotIndex);
            }, 500);

            timers.push(t2);
        }, delay);

        timers.push(t);
    }

    onMount(() => {
        for (let i = 0; i < 7; i++) {
            const initialDelay = i * 600 + Math.random() * 800;
            const t = setTimeout(() => scheduleSlot(i), initialDelay);
            timers.push(t);
        }
    });

    onDestroy(() => {
        timers.forEach(t => clearTimeout(t));
        timers = [];
    });
</script>

<!-- Gallery -->
<div class="flex h-[500px] items-center gap-3 max-md:h-auto max-md:w-full max-md:justify-center">

    <!-- Col 0 -->
    <div class="flex flex-col gap-3">
        <div class="h-[160px] w-[150px] overflow-hidden rounded-2xl bg-[#161b27] animate-[fadeUp_.6s_ease_.45s_both]">
            <img
                    src={currentPhotos[0]}
                    alt="Galeria 1"
                    class="h-full w-full object-cover hover:scale-105"
                    style="opacity: {fadingSlots.has(0) ? 0 : 1}; transform: scale({fadingSlots.has(0) ? 1.04 : 1}); transition: opacity 0.5s ease, transform 0.5s ease;"
            />
        </div>
        <div class="h-[150px] w-[150px] overflow-hidden rounded-2xl bg-[#161b27] animate-[fadeUp_.6s_ease_.55s_both]">
            <img
                    src={currentPhotos[1]}
                    alt="Galeria 2"
                    class="h-full w-full object-cover hover:scale-105"
                    style="opacity: {fadingSlots.has(1) ? 0 : 1}; transform: scale({fadingSlots.has(1) ? 1.04 : 1}); transition: opacity 0.5s ease, transform 0.5s ease;"
            />
        </div>
    </div>

    <!-- Col 1 -->
    <div class="mt-14 flex flex-col gap-3 animate-[fadeUp_.6s_ease_.3s_both]">
        <div class="h-[320px] w-[150px] overflow-hidden rounded-2xl bg-[#161b27]">
            <img
                    src={currentPhotos[2]}
                    alt="Galeria 3"
                    class="h-full w-full object-cover hover:scale-105"
                    style="opacity: {fadingSlots.has(2) ? 0 : 1}; transform: scale({fadingSlots.has(2) ? 1.04 : 1}); transition: opacity 0.5s ease, transform 0.5s ease;"
            />
        </div>
    </div>

    <!-- Col 2 -->
    <div class="flex flex-col gap-3">
        <div class="h-[190px] w-[150px] overflow-hidden rounded-2xl bg-[#161b27] animate-[fadeUp_.6s_ease_.45s_both]">
            <img
                    src={currentPhotos[3]}
                    alt="Galeria 4"
                    class="h-full w-full object-cover hover:scale-105"
                    style="opacity: {fadingSlots.has(3) ? 0 : 1}; transform: scale({fadingSlots.has(3) ? 1.04 : 1}); transition: opacity 0.5s ease, transform 0.5s ease;"
            />
        </div>
        <div class="h-[190px] w-[150px] overflow-hidden rounded-2xl bg-[#161b27] animate-[fadeUp_.6s_ease_.55s_both]">
            <img
                    src={currentPhotos[4]}
                    alt="Galeria 5"
                    class="h-full w-full object-cover hover:scale-105"
                    style="opacity: {fadingSlots.has(4) ? 0 : 1}; transform: scale({fadingSlots.has(4) ? 1.04 : 1}); transition: opacity 0.5s ease, transform 0.5s ease;"
            />
        </div>
    </div>

    <!-- Col 3 -->
    <div class="-mt-10 flex flex-col gap-3">
        <div class="h-[155px] w-[125px] overflow-hidden rounded-2xl bg-[#161b27] animate-[fadeUp_.6s_ease_.5s_both]">
            <img
                    src={currentPhotos[5]}
                    alt="Galeria 6"
                    class="h-full w-full object-cover hover:scale-105"
                    style="opacity: {fadingSlots.has(5) ? 0 : 1}; transform: scale({fadingSlots.has(5) ? 1.04 : 1}); transition: opacity 0.5s ease, transform 0.5s ease;"
            />
        </div>
        <div class="h-[155px] w-[125px] overflow-hidden rounded-2xl bg-[#161b27] animate-[fadeUp_.6s_ease_.65s_both]">
            <img
                    src={currentPhotos[6]}
                    alt="Galeria 7"
                    class="h-full w-full object-cover hover:scale-105"
                    style="opacity: {fadingSlots.has(6) ? 0 : 1}; transform: scale({fadingSlots.has(6) ? 1.04 : 1}); transition: opacity 0.5s ease, transform 0.5s ease;"
            />
        </div>
    </div>

</div>

<style>
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
    }
</style>