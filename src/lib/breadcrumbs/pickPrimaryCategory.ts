import { WooCategory } from "@/types/woocommerce";

/**
 * Strategy:
 * - choose deepest category (has parent)
 * - fallback to first
 */
export function pickPrimaryCategory(
    categories: WooCategory[]
): WooCategory {
    return categories.sort(
        (a, b) => b.parent - a.parent
    )[0];
}
