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

    return (
        <>

            <header className="text-center my-4">
                <h1 className="text-xl font-semibold">Shop</h1>
            </header>

        </>
    );
}
