import React from "react";
import getProductCategories from "@/lib/api/getProductCategories";
import ProductCategories from "@/components/categories/ProductCategories";
import ProductCategory from "@/types/ProductCategory";

export default async function ProductCategoriesPage() {
    const categories = await getProductCategories({hide_empty: true});

    const childCategories = categories.filter(
        (category: ProductCategory) => category.parent !== 0
    );

    return (

        <>
            <ProductCategories categories={childCategories}/>
        </>

    );
}
