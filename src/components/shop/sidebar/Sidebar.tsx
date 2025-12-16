// components/shop/sidebar/Sidebar.tsx
import getAllCategories from "@/lib/api/woocommerce/getAllCategories";
import buildCategoryTree from "@/utils/buildCategoryTree";
import CategoryTree from "@/types/CategoryTree";
import SidebarFilters from "@/components/shop/sidebar/SidebarFilters";

interface Props {
    className?: string;
    initialSearch: string;
    initialCategories: number[];
}

// function SidebarFilters(props: { categories: CategoryTree[], initialSearch: string, initialCategories: number[] }) {
//     return null;
// }

export default async function Sidebar({
                                          className,
                                          initialSearch,
                                          initialCategories,
                                      }: Props) {

    const categories = await getAllCategories({ per_page: 100 });
    const tree = buildCategoryTree(categories);

    return (
        <aside className={className}>
            <SidebarFilters
                categories={tree}
                initialSearch={initialSearch}
                initialCategories={initialCategories}
            />
        </aside>
    );
}
