import ProductCategory from "@/types/ProductCategory";
import buildCategoryChain from "@/lib/breadcrumbs/categoryTree";

export default function getDeepestCategoryChain(
    productCategories: ProductCategory[],
    categoryMap: Map<number, ProductCategory>
): ProductCategory[] {
    let deepestChain: ProductCategory[] = [];

    for (const cat of productCategories) {
        const fullCat = categoryMap.get(cat.id);
        if (!fullCat) continue;

        const chain = buildCategoryChain(fullCat, categoryMap);

        if (chain.length > deepestChain.length) {
            deepestChain = chain;
        }
    }

    return deepestChain;
}
