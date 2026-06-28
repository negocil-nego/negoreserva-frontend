import { CategoryType } from "$lib/feature/shared/category/model/category.model";

export const CategoryTypeLabel: Record<string, string> = {
    [CategoryType.HOSTING]: "Hospedagem",
    [CategoryType.RESTAURANT]: "Restaurante",
}