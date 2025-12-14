import React from "react";
import getProductCategories from "@/lib/api/getProductCategories";
import CategoriesGrid from "@/components/categories/CategoriesGrid";

export default async function ProductCategoriesPage() {
    const categories = await getProductCategories({hide_empty: true, parent: 0});

    return (

        <>
            <CategoriesGrid categories={categories}/>
        </>

    );
}
