import React from "react";
import CategoriesGrid from "@/components/categories/CategoriesGrid";
import {getAllCategories} from "@/lib/api/getAllCategories";

export default async function ProductCategoriesPage() {
    const categories = await getAllCategories({hide_empty: true, parent: 0});

    return (

        <>
            <CategoriesGrid data={categories}/>
        </>

    );
}
