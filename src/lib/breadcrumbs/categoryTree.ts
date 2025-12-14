import { WooCategory } from "@/types/woocommerce";

export function buildCategoryChain(
    category: WooCategory,
    categoryMap: Map<number, WooCategory>
): WooCategory[] {
    const chain: WooCategory[] = [];
    let current: WooCategory | undefined = category;

    while (current) {
        chain.push(current);
        current = current.parent
            ? categoryMap.get(current.parent)
            : undefined;
    }

    return chain.reverse();
}
