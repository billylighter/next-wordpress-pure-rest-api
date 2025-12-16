"use client";

import CategoryFilter from "@/components/shop/sidebar/CategoryFilter";
import CategoryTree from "@/types/CategoryTree";

interface Props {
    categories: CategoryTree[];
    selectedIds: number[];
    onChange: (ids: number[]) => void;
}

export default function SidebarCategoryFilter({
                                                  categories,
                                                  selectedIds,
                                                  onChange,
                                              }: Props) {

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>

            <CategoryFilter
                categories={categories}
                selectedIds={selectedIds}
                onChange={onChange}
            />
        </div>
    );
}
