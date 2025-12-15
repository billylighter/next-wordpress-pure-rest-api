import React, {Suspense} from "react";
import getProductsByCategoryId from "@/lib/api/getProductsByCategoryId";
import {notFound} from "next/navigation";
import CategoriesGrid from "@/components/categories/CategoriesGrid";
import {getAllCategories} from "@/lib/api/woocommerce/getAllCategories";
import {getAllProducts} from "@/lib/api/woocommerce/getAllProducts";

interface PageProps {
    params: {
        slug: string[];
    };
}

export default async function CategoryPage({params}: PageProps) {
    const {slug} = await params;
    const findCategory = await getAllCategories({slug: String(slug.at(-1))});
    const category = findCategory[0];

    if(!category) return notFound();
    const categoryChildren = await getAllCategories({ hide_empty: true,  parent: category.id})

    if(!categoryChildren) return notFound();

    const data = categoryChildren.length !== 0
        ? await getAllCategories({ hide_empty: true,  parent: category.id})
        : await getAllProducts({ hide_empty: true, category: category.id });

    return (
        <div>
            <header className="text-center my-4">
                <h1 className="text-xl font-semibold">{category.name}</h1>
                {category.description && (
                    <p className="text-gray-500 italic mt-2">{category.description}</p>
                )}
            </header>

            <CategoriesGrid data={data}/>

        </div>
    );
}
