import ProductCategory from "@/types/ProductCategory";

/**
 * Strategy:
 * - choose deepest category (has parent)
 * - fallback to first
 */
export function pickPrimaryCategory(
    categories: ProductCategory[]
): ProductCategory {
    return categories.sort(
        (a, b) => b.parent - a.parent
    )[0];
}
