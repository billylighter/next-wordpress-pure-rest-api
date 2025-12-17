import ProductCategory from "@/types/ProductCategory";
import CategoryTree from "@/types/CategoryTree";

export default function buildCategoryTree(
    categories: ProductCategory[]
): CategoryTree[] {
    const map = new Map<number, CategoryTree>();
    const roots: CategoryTree[] = [];

    for (const category of categories) {
        map.set(category.id, {
            ...category,
            children: [],
        });
    }

    for (const category of map.values()) {
        if (category.parent && map.has(category.parent)) {
            map.get(category.parent)!.children.push(category);
        } else {
            roots.push(category);
        }
    }

    return roots;
}
