import React, {Suspense} from "react";
import getCategoryBySlug from "@/lib/api/getCategoryBySlug";
import getProductsByCategoryId from "@/lib/api/getProductsByCategoryId";
import ProductCategories from "@/components/categories/ProductCategories";
import {notFound} from "next/navigation";

interface PageProps {
    params: {
        slug: string[];
    };
}

export default async function CategoryPage({params}: PageProps) {
    const {slug} = await params;
    const category = await getCategoryBySlug(String(slug));

    if(!category) return notFound();
    const categoryProducts = await getProductsByCategoryId(Number(category.id), {hide_empty: true});
    if(!category) return notFound();

    return (
        <div>
            <header className="text-center my-4">
                <h1 className="text-xl font-semibold">{category.name}</h1>
                {category.description && (
                    <p className="text-gray-500 italic mt-2">{category.description}</p>
                )}
            </header>

            <ProductCategories categories={categoryProducts} />
        </div>
    );
}
