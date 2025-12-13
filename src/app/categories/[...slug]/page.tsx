"use server";

import React, { Suspense } from "react";
import getChildCategories from "@/lib/api/getChildCategories";
import getCategoryBySlug from "@/lib/api/getCategoryBySlug";
import getProductsByCategoryId from "@/lib/api/getProductsByCategoryId";
import ProductCategories from "@/components/categories/ProductCategories";

interface PageProps {
    params: {
        slug: string[];
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const {slug} = await params;
    const lastSlugSegment = slug.at(-1);
    if (!lastSlugSegment) return <Suspense />;

    const category = await getCategoryBySlug(lastSlugSegment);
    if (!category) return <Suspense />;

    const childCategories = await getChildCategories(category, { hide_empty: true });

    // Use const with ternary instead of let
    const data = childCategories.length > 0
        ? childCategories
        : await getProductsByCategoryId(category.id);

    return (
        <div>
            <header className="text-center my-4">
                <h1 className="text-xl font-semibold">{category.name}</h1>
                {category.description && (
                    <p className="text-gray-500 italic mt-2">{category.description}</p>
                )}
            </header>

            <ProductCategories categories={data} />
        </div>
    );
}
