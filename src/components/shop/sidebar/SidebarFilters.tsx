"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SidebarSearch from "./SidebarSearch";
import SidebarCategoryFilter from "./SidebarCategoryFilter";
import CategoryTree from "@/types/CategoryTree";

interface Props {
    categories: CategoryTree[];
    initialSearch: string;
    initialCategories: number[];
}

export default function SidebarFilters({
                                           categories,
                                           initialSearch,
                                           initialCategories,
                                       }: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(initialSearch);
    const [selectedCategories, setSelectedCategories] =
        useState<number[]>(initialCategories);

    const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams.toString());

        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }

        if (selectedCategories.length) {
            params.set(
                "categories",
                [...selectedCategories].sort().join(",")
            );
        } else {
            params.delete("categories");
        }

        router.push(`/shop?${params.toString()}`);
    };

    return (
        <form onSubmit={applyFilters} className="space-y-6">
            <SidebarSearch
                value={search}
                onChange={setSearch}
            />

            <SidebarCategoryFilter
                categories={categories}
                selectedIds={selectedCategories}
                onChange={setSelectedCategories}
            />

            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md"
            >
                Apply filters
            </button>
        </form>
    );
}
