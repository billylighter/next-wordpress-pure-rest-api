import React from "react";
import getProductCategories from "@/lib/api/getProductCategories";
import ParentCategories from "@/components/shop/ProductsGrid";

export default async function ProductCategoriesPage() {
    const categories = await getProductCategories({hide_empty: true, parent: 0, per_page: 100});

    return (

        <>
            <h1 className={"text-xl font-semibold text-center my-4"}>Front page</h1>

        </>

    );
}
