<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";

    let {
        value = $bindable(""),
        province = "",
        onValueChange = $bindable(),
    }: {
        value?: string;
        province?: string;
        onValueChange?: (v: string) => void;
    } = $props();

    const municipalitiesByProvince: Record<string, { value: string; label: string }[]> = {
        luanda: [
            { value: "belas", label: "Belas" },
            { value: "cacuaco", label: "Cacuaco" },
            { value: "cazenga", label: "Cazenga" },
            { value: "kilamba-kiaxi", label: "Kilamba Kiaxi" },
            { value: "luanda", label: "Luanda" },
            { value: "talatona", label: "Talatona" },
            { value: "viana", label: "Viana" },
            { value: "iguange", label: "Iguange" },
        ],
        benguela: [
            { value: "benguela", label: "Benguela" },
            { value: "balombo", label: "Balombo" },
            { value: "baia-farta", label: "Baía Farta" },
            { value: "cubal", label: "Cubal" },
            { value: "caimbambo", label: "Caimbambo" },
            { value: "ganda", label: "Ganda" },
            { value: "lobito", label: "Lobito" },
        ],
        huila: [
            { value: "lubango", label: "Lubango" },
            { value: "cacula", label: "Cacula" },
            { value: "caluquembe", label: "Caluquembe" },
            { value: "chiange", label: "Chiange" },
            { value: "chibia", label: "Chibia" },
            { value: "chicomba", label: "Chicomba" },
            { value: "cuvango", label: "Cuvango" },
            { value: "humpata", label: "Humpata" },
            { value: "jamba", label: "Jamba" },
            { value: "matala", label: "Matala" },
            { value: "quilengues", label: "Quilengues" },
        ],
        huambo: [
            { value: "huambo", label: "Huambo" },
            { value: "bailundo", label: "Bailundo" },
            { value: "cachiungo", label: "Cachiungo" },
            { value: "caala", label: "Caála" },
            { value: "londuimbale", label: "Londuimbale" },
            { value: "longonjo", label: "Longonjo" },
            { value: "mungo", label: "Mungo" },
            { value: "tchicala-tcholohanga", label: "Tchicala-Tcholohanga" },
            { value: "tchindjenje", label: "Tchindjenje" },
            { value: "ukuma", label: "Ukuma" },
        ],
        bengo: [
            { value: "caxito", label: "Caxito" },
            { value: "ambriz", label: "Ambriz" },
            { value: "bula-atumba", label: "Bula-Atumba" },
            { value: "dande", label: "Dande" },
            { value: "dembos", label: "Dembos" },
            { value: "nambuangongo", label: "Nambuangongo" },
            { value: "pango-aluquem", label: "Pango-Aluquém" },
        ],
        bie: [
            { value: "cuito", label: "Cuito" },
            { value: "andulo", label: "Andulo" },
            { value: "camacupa", label: "Camacupa" },
            { value: "catabola", label: "Catabola" },
            { value: "chinguar", label: "Chinguar" },
            { value: "chitembo", label: "Chitembo" },
            { value: "cuemba", label: "Cuemba" },
            { value: "cunhinga", label: "Cunhinga" },
            { value: "nharea", label: "Nharea" },
        ],
        cabinda: [
            { value: "cabinda", label: "Cabinda" },
            { value: "buco-zau", label: "Buco-Zau" },
            { value: "cacongo", label: "Cacongo" },
        ],
        "cuando-cubango": [
            { value: "menongue", label: "Menongue" },
            { value: "caiundo", label: "Caiundo" },
            { value: "cuchi", label: "Cuchi" },
            { value: "cuangar", label: "Cuangar" },
            { value: "cuito-cuanavale", label: "Cuito Cuanavale" },
            { value: "dirico", label: "Dirico" },
            { value: "longa", label: "Longa" },
            { value: "mavinga", label: "Mavinga" },
            { value: "nancova", label: "Nancova" },
            { value: "rivungo", label: "Rivungo" },
        ],
        "cuanza-norte": [
            { value: "n'dalatando", label: "N'dalatando" },
            { value: "ambaca", label: "Ambaca" },
            { value: "bangas", label: "Bangas" },
            { value: "bolongongo", label: "Bolongongo" },
            { value: "cambambe", label: "Cambambe" },
            { value: "cazengo", label: "Cazengo" },
            { value: "golungo-alto", label: "Golungo Alto" },
            { value: "lucala", label: "Lucala" },
            { value: "ngonguembo", label: "Ngonguembo" },
            { value: "quiculungo", label: "Quiculungo" },
            { value: "samba-caju", label: "Samba Caju" },
        ],
        "cuanza-sul": [
            { value: "sumbe", label: "Sumbe" },
            { value: "amboim", label: "Amboim" },
            { value: "cassongue", label: "Cassongue" },
            { value: "cerra-de-kilo", label: "Cerra de Kilo" },
            { value: "conda", label: "Conda" },
            { value: "ebo", label: "Ebo" },
            { value: "libolo", label: "Libolo" },
            { value: "mussende", label: "Mussende" },
            { value: "porto-amboim", label: "Porto Amboim" },
            { value: "quibala", label: "Quibala" },
            { value: "quilenda", label: "Quilenda" },
            { value: "seles", label: "Seles" },
        ],
        cunene: [
            { value: "ondjiva", label: "Ondjiva" },
            { value: "cahama", label: "Cahama" },
            { value: "cuanhama", label: "Cuanhama" },
            { value: "curoca", label: "Curoca" },
            { value: "kuvelai", label: "Kuvelai" },
            { value: "namacunde", label: "Namacunde" },
            { value: "ombadja", label: "Ombadja" },
        ],
        "lunda-norte": [
            { value: "dundo", label: "Dundo" },
            { value: "capenda-camulemba", label: "Capenda-Camulemba" },
            { value: "caungula", label: "Caungula" },
            { value: "chitato", label: "Chitato" },
            { value: "cuango", label: "Cuango" },
            { value: "cuilo", label: "Cuilo" },
            { value: "xá-muteba", label: "Xá-Muteba" },
        ],
        "lunda-sul": [
            { value: "saurimo", label: "Saurimo" },
            { value: "cacolo", label: "Cacolo" },
            { value: "dala", label: "Dala" },
            { value: "muconda", label: "Muconda" },
        ],
        malanje: [
            { value: "malanje", label: "Malanje" },
            { value: "cacuso", label: "Cacuso" },
            { value: "calandula", label: "Calandula" },
            { value: "cambundi-catembo", label: "Cambundi-Catembo" },
            { value: "cangandala", label: "Cangandala" },
            { value: "cuaba-nzogo", label: "Cuaba Nzogo" },
            { value: "kunda-dia-baze", label: "Kunda-dia-Baze" },
            { value: "luquembo", label: "Luquembo" },
            { value: "marimba", label: "Marimba" },
            { value: "massango", label: "Massango" },
            { value: "mucari", label: "Mucari" },
            { value: "quela", label: "Quela" },
            { value: "quirima", label: "Quirima" },
        ],
        moxico: [
            { value: "luena", label: "Luena" },
            { value: "alta-zambeze", label: "Alta Zambêze" },
            { value: "bundas", label: "Bundas" },
            { value: "camanongue", label: "Camanongue" },
            { value: "léua", label: "Léua" },
            { value: "luau", label: "Luau" },
            { value: "luchazes", label: "Luchazes" },
            { value: "moxico", label: "Moxico" },
        ],
        namibe: [
            { value: "moçâmedes", label: "Moçâmedes" },
            { value: "bibala", label: "Bibala" },
            { value: "camucuio", label: "Camucuio" },
            { value: "tômbua", label: "Tômbua" },
            { value: "virei", label: "Virei" },
        ],
        uige: [
            { value: "uige", label: "Uíge" },
            { value: "ambuila", label: "Ambuila" },
            { value: "bembe", label: "Bembe" },
            { value: "buengas", label: "Buengas" },
            { value: "cangola", label: "Cangola" },
            { value: "damba", label: "Damba" },
            { value: "milunga", label: "Milunga" },
            { value: "mucaba", label: "Mucaba" },
            { value: "negage", label: "Negage" },
            { value: "pombo", label: "Pombo" },
            { value: "quitexe", label: "Quitexe" },
            { value: "sanza-pombo", label: "Sanza Pombo" },
            { value: "songo", label: "Songo" },
            { value: "zombo", label: "Zombo" },
        ],
        zaire: [
            { value: "m'banza-kongo", label: "M'Banza Kongo" },
            { value: "cuimba", label: "Cuimba" },
            { value: "noqui", label: "Noqui" },
            { value: "n'zeto", label: "N'Zeto" },
            { value: "soyo", label: "Soyo" },
            { value: "tomboco", label: "Tomboco" },
        ],
    };

    const municipalities = $derived(province ? municipalitiesByProvince[province] ?? [] : []);

    function handleValueChange(v: string) {
        value = v;
        onValueChange?.(v);
    }
</script>

<Select.Root type="single" bind:value onValueChange={handleValueChange}>
    <Select.Trigger class="w-full bg-white dark:bg-background">
        {value ? municipalities.find(m => m.value === value)?.label : "Todos os Municípios"}
    </Select.Trigger>
    <Select.Content class="max-h-75">
        <Select.Item value="">Todos os Municípios</Select.Item>
        {#each municipalities as municipality (municipality.value)}
            <Select.Item value={municipality.value}>{municipality.label}</Select.Item>
        {/each}
    </Select.Content>
</Select.Root>
