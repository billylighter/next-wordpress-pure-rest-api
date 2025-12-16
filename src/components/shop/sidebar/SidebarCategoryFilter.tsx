"use client";

import { useState } from "react";
import CategoryFilter from "@/components/shop/sidebar/CategoryFilter";
import CategoryTree  from "@/types/CategoryTree";

interface Props {
    categories: CategoryTree[];
}

export default function SidebarCategoryFilter({ categories }: Props) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleChange = (ids: number[]) => {
        setSelectedIds(ids);
    };

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>

            <CategoryFilter
                categories={categories}
                selectedIds={selectedIds}
                onChange={handleChange}
            />
        </div>
    );
}
