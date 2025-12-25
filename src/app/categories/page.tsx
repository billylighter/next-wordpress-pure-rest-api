import React from "react";
import CategoriesGrid from "@/components/categories/CategoriesGrid";
import getAllCategories from "@/lib/api/woocommerce/getAllCategories";
import Breadcrumbs from "@/ui/Breadcrumbs";

export default async function ProductCategoriesPage() {
    const categories = await getAllCategories({hide_empty: true, parent: 0, per_page: 100});

    const breadcrumbs = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "Categories",
            href: "/categories"
        },
    ];

    return (

        <>
            <div className={"mb-4"}>
                <Breadcrumbs items={breadcrumbs}/>
            </div>
            <CategoriesGrid data={categories}/>
        </>

    );
}
