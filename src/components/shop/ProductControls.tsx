"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface ProductsControlsProps {
    pageSizes?: number[]; // optional sizes
    defaultSort?: "asc" | "desc";
}

export default function ProductsControls({
                                             pageSizes = [8, 12, 16, 24, 32],
                                             defaultSort = "asc",
                                         }: ProductsControlsProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPageSize = searchParams.get("per_page") || "20";
    const currentSort = searchParams.get("sort") || defaultSort;

    const handleChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.push(`/shop?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-4 mb-6">
            {/* Pagination size */}
            <div>
                <label className="mr-2">Products per page:</label>
                <select
                    value={currentPageSize}
                    onChange={(e) => handleChange("per_page", e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    {pageSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sorting */}
            <div>
                <label className="mr-2">Sort:</label>
                <select value={currentSort}
                    onChange={(e) => handleChange("sort", e.target.value)}
                    className="border rounded px-2 py-1">
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                </select>
            </div>
        </div>
    );
}
