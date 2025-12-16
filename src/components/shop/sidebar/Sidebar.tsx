import React from "react";
import getAllCategories from "@/lib/api/woocommerce/getAllCategories";
import buildCategoryTree from "@/utils/buildCategoryTree";
import SidebarCategoryFilter from "@/components/shop/sidebar/SidebarCategoryFilter";
import SidebarSearch from "@/components/shop/sidebar/SidebarSearch";

interface SidebarProps {
    className?: string
}

export default async function Sidebar({className}: SidebarProps) {

    const categories = await getAllCategories({per_page: 100});
    const categoriesTree = buildCategoryTree(categories);

    return (
        <aside className={className}>
            <SidebarSearch />
            <SidebarCategoryFilter categories={categoriesTree} />
        </aside>
    )
}