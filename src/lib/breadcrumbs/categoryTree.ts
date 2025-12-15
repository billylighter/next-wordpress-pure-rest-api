import ProductCategory from "@/types/ProductCategory";

export function buildCategoryChain(
    category: ProductCategory,
    categoryMap: Map<number, ProductCategory>
): ProductCategory[] {
    const chain: ProductCategory[] = [];
    let current: ProductCategory | undefined = category;

    while (current) {
        chain.push(current);
        current = current.parent
            ? categoryMap.get(current.parent)
            : undefined;
    }

    return chain.reverse();
}
