import ProductCategory from "@/types/ProductCategory";

export default interface CategoryTree extends ProductCategory {
    children: CategoryTree[];
}