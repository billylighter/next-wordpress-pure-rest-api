import getAllCategories from "@/lib/api/woocommerce/getAllCategories";
import buildCategoryTree from "@/lib/breadcrumbs/buildCategoryTree";
import CategoryTree from "@/types/CategoryTree";
import SidebarFilters from "@/components/shop/sidebar/SidebarFilters";
import getAllTags from "@/lib/api/woocommerce/getAllTags";
import ProductTag from "@/types/ProductTag";

interface SidebarProps {
    className?: string;
    categories: CategoryTree[],
    tags: ProductTag[];
    initialSearch: string;
    initialCategories: number[];
    initialTags: number[];
}


export default async function Sidebar(
    {
        className,
        initialSearch,
        initialCategories,
        initialTags,
    }: SidebarProps) {

    const categories = await getAllCategories({per_page: 100});
    const tags = await getAllTags();
    const tree = buildCategoryTree(categories);

    return (
        <aside className={className}>
            <SidebarFilters
                categories={tree}
                tags={tags}
                initialSearch={initialSearch}
                initialCategories={initialCategories}
                initialTags={initialTags}
            />
        </aside>
    );
}
