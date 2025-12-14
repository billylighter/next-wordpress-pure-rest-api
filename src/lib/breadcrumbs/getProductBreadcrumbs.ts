import { WooProduct } from "@/types/woocommerce";

import { pickPrimaryCategory } from "./pickPrimaryCategory";
import { buildCategoryChain } from "./categoryTree";
import {getAllCategories} from "@/lib/api/getAllCategories";

export interface BreadcrumbItem {
    label: string;
    href: string;
}

export async function getProductBreadcrumbs(
    product: WooProduct
): Promise<BreadcrumbItem[]> {
    const allCategories = await getAllCategories();

    const categoryMap = new Map(
        allCategories.map(cat => [cat.id, cat])
    );

    const primaryCategory = pickPrimaryCategory(product.categories);
    const fullCategory = categoryMap.get(primaryCategory.id);

    const categoryChain = fullCategory
        ? buildCategoryChain(fullCategory, categoryMap)
        : [];

    return [
        { label: "Home", href: "/" },
        ...categoryChain.map(cat => ({
            label: cat.name,
            href: `/product-category/${cat.slug}`
        })),
        {
            label: product.name,
            href: `/product/${product.slug}`
        }
    ];
}
