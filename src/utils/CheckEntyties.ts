import ProductCategory from "@/types/ProductCategory";
import Product from "@/types/Product";

export function isProduct(item: ProductCategory | Product): item is Product {
    return (item as Product).images !== undefined;
}

export function isProductCategory(item: ProductCategory | Product): item is ProductCategory {
    return (item as ProductCategory).count !== undefined;
}
