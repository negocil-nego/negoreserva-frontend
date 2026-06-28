export class ProductPriceType {
    public static readonly HOUR: string = "HOUR"
    public static readonly DAY: string = "DAY"
    public static readonly NIGHT: string = "NIGHT"
    public static readonly BASE: string = "BASE"
}

export const ProductPriceTypeLabel: Record<string, string> = {
    [ProductPriceType.HOUR]: "Hora",
    [ProductPriceType.DAY]: "Dia",
    [ProductPriceType.NIGHT]: "Noite",
    [ProductPriceType.BASE]: "Normal",
}