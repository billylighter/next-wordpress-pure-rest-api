"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import SidebarSearch from "./SidebarSearch";
import SidebarCategoryFilter from "./SidebarCategoryFilter";
import SidebarTagFilter from "./SidebarTagFilter";
import CategoryTree from "@/types/CategoryTree";
import ProductTag from "@/types/ProductTag";
import {RiResetRightLine} from "react-icons/ri";

interface Props {
    categories: CategoryTree[];
    tags: ProductTag[];
    initialSearch: string;
    initialCategories: number[];
    initialTags: number[];
}

export default function SidebarFilters(
    {
        categories,
        tags,
        initialSearch,
        initialCategories,
        initialTags,
    }: Props) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(initialSearch);
    const [selectedCategories, setSelectedCategories] =
        useState<number[]>(initialCategories);
    const [selectedTags, setSelectedTags] =
        useState<number[]>(initialTags);

    const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams.toString());

        // reset pagination on filter change
        params.delete("page");

        if (search.trim()) {
            params.set("search", search.trim());
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

        if (selectedTags.length) {
            params.set(
                "tags",
                [...selectedTags].sort().join(",")
            );
        } else {
            params.delete("tags");
        }

        router.push(`/shop?${params.toString()}`);
    };

    const resetFilters = () => {
        setSearch("");
        setSelectedCategories([]);
        setSelectedTags([]);

        router.push(`/shop`);
    }

    return (
       <>
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

               <SidebarTagFilter
                   tags={tags}
                   selectedIds={selectedTags}
                   onChange={setSelectedTags}
               />

               <button type="submit"
                       className="w-full bg-gray-900 hover:bg-gray-700 text-white py-2 rounded cursor-pointer">
                   Apply filters
               </button>
           </form>

           <button onClick={resetFilters} className={"mt-2 inline-flex justify-center items-center w-full bg-gray-900 hover:bg-gray-700 text-white py-2 rounded cursor-pointer"}>
               <RiResetRightLine className={"me-2"} />
               Reset filters
           </button>
       </>
    );
}
