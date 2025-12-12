import React from "react";
import getParentProductCategories from "@/lib/api/getParentProductCategories";
import ParentCategories from "@/components/categories/ParentCategories";

export default async function ProductCategoriesPage() {
    const categories = await getParentProductCategories();

    return (


            <ParentCategories categories={categories}/>


    );
}
