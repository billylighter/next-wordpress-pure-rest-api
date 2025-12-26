"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import SidebarSearch from "./filters/SidebarSearch";
import SidebarCategoryFilter from "./filters/SidebarCategoryFilter";
import SidebarTagFilter from "./filters/SidebarTagFilter";
import SidebarPriceFilter from "@/components/shop/sidebar/filters/SidebarPriceFilter";
import CategoryTree from "@/types/CategoryTree";
import ProductTag from "@/types/ProductTag";
import {RiResetRightLine} from "react-icons/ri";
import NProgress from "nprogress";

interface SidebarFiltersProps {
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
    }: SidebarFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(initialSearch);
    const [selectedCategories, setSelectedCategories] =
        useState<number[]>(initialCategories);
    const [selectedTags, setSelectedTags] =
        useState<number[]>(initialTags);

    const [minPrice, setMinPrice] = useState<number | null>(
        searchParams.get("min_price")
            ? Number(searchParams.get("min_price"))
            : 0
    );
    const [maxPrice, setMaxPrice] = useState<number | null>(
        searchParams.get("max_price")
            ? Number(searchParams.get("max_price"))
            : 500
    );

    const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        NProgress.start();

        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");

        // search
        if (search.trim()) {
            params.set("search", search.trim());
        } else {
            params.delete("search");
        }

        // categories
        if (selectedCategories.length) {
            params.set(
                "categories",
                [...selectedCategories].sort().join(",")
            );
        } else {
            params.delete("categories");
        }

        // tags
        if (selectedTags.length) {
            params.set(
                "tags",
                [...selectedTags].sort().join(",")
            );
        } else {
            params.delete("tags");
        }

        // price
        if (minPrice !== null) {
            params.set("min_price", String(minPrice));
        } else {
            params.delete("min_price");
        }

        if (maxPrice !== null) {
            params.set("max_price", String(maxPrice));
        } else {
            params.delete("max_price");
        }

        router.push(`/shop?${params.toString()}`);

        setTimeout(() => {
            NProgress.done();
        }, 300);
    };

    const hasActiveFilters = (() => {
        const filterKeys = [
            "search",
            "categories",
            "tags",
            "min_price",
            "max_price",
        ];

        return filterKeys.some((key) => {
            const value = searchParams.get(key);
            return value !== null && value !== "";
        });
    })();

    const resetFilters = () => {
        NProgress.start();

        setSearch("");
        setSelectedCategories([]);
        setSelectedTags([]);
        setMinPrice(null);
        setMaxPrice(null);

        router.push(`/shop`);

        setTimeout(() => {
            NProgress.done();
        }, 300);
    };

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

                <hr className={"text-gray-300"}/>

                <SidebarTagFilter
                    tags={tags}
                    selectedIds={selectedTags}
                    onChange={setSelectedTags}
                />

                <hr className={"text-gray-300"}/>

                <SidebarPriceFilter
                    min={0}
                    max={1000}
                    value={{min: minPrice, max: maxPrice}}
                    onChange={({min, max}) => {
                        setMinPrice(min);
                        setMaxPrice(max);
                    }}
                />

                <button type="submit"
                        className="w-full bg-gray-900 hover:bg-gray-700 text-white py-2 rounded cursor-pointer">
                    Apply filters
                </button>
            </form>

            {hasActiveFilters && (
                <button
                    onClick={resetFilters}
                    className="mt-2 inline-flex justify-center items-center w-full bg-amber-600 hover:bg-amber-500 text-white py-2 rounded cursor-pointer"
                >
                    <RiResetRightLine className="me-2"/>
                    Reset filters
                </button>
            )}
        </>
    );
}
