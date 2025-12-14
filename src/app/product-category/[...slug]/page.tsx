import React, {Suspense} from "react";
import getCategoryBySlug from "@/lib/api/getCategoryBySlug";
import getProductsByCategoryId from "@/lib/api/getProductsByCategoryId";
import ProductCategories from "@/components/shop/ProductCategories";
import {notFound} from "next/navigation";
import getChildCategoriesBySlug from "@/lib/api/getChildCategories";


interface PageProps {
    params: {
        slug: string[];
    };
}

export default async function CategoryPage({params}: PageProps) {
    const {slug} = await params;
    const category = await getCategoryBySlug(String(slug.at(-1)));

    if(!category) return notFound();
    const categoryChildren = await getChildCategoriesBySlug(category, {hide_empty: true});

    if(!categoryChildren) return notFound();

    const data = categoryChildren.length !== 0
        ? await getChildCategoriesBySlug(category, { hide_empty: true })
        : await getProductsByCategoryId(category.id, { hide_empty: true });



    console.log(categoryChildren.length)

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
