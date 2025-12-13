import React from "react";
import getProductCategories from "@/lib/api/getProductCategories";
import ParentCategories from "@/components/categories/ProductCategories";

export default async function ProductCategoriesPage() {
    const categories = await getProductCategories({hide_empty: true, parent: 0, per_page: 100});

    return (

        <>
            <h1 className={"text-xl font-semibold text-center my-4"}>Main categories</h1>
            <ParentCategories categories={categories}/>
        </>

    );
}
