import React from "react";
import getProductCategories from "@/lib/api/getProductCategories";
import ParentCategories from "@/components/categories/ParentCategories";

export default async function ProductCategoriesPage() {
    const categories = await getProductCategories({hide_empty: true});

    return (

        <ParentCategories categories={categories}/>

    );
}
