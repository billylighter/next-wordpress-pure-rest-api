import React from "react";
import getProductCategories from "@/lib/api/getProductCategories";
import ProductCategories from "@/components/categories/ProductCategories";
import ProductCategory from "@/types/ProductCategory";

export default async function ProductCategoriesPage() {
    const categories = await getProductCategories({hide_empty: true, parent: 0});

    console.log(categories)

    return (

        <>
            <ProductCategories categories={categories}/>
        </>

    );
}
