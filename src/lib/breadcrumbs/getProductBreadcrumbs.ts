import Product from "@/types/Product";
import getAllCategories from "@/lib/api/woocommerce/getAllCategories";
import getDeepestCategoryChain from "@/lib/breadcrumbs/getDeepestCategoryChain";

export interface BreadcrumbItem {
    label: string;
    href: string;
}

export default async function getProductBreadcrumbs(
    product: Product
): Promise<BreadcrumbItem[]> {
    const allCategories = await getAllCategories();

    const categoryMap = new Map(
        allCategories.map(cat => [cat.id, cat])
    );

    const categoryChain = getDeepestCategoryChain(
        product.categories,
        categoryMap
    );

    return [
        { label: "Home", href: "/" },
        ...categoryChain.map(cat => ({
            label: cat.name,
            href: `/product-category/${cat.slug}` // adjust to your route
        })),
        {
            label: product.name,
            href: `/product/${product.slug}`
        }
    ];
}
