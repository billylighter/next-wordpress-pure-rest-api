import {Metadata} from "next";
import Sidebar from "@/components/shop/sidebar/Sidebar";
import ProductsGrid from "@/components/shop/ProductsGrid";
import getAllProducts from "@/lib/api/woocommerce/getAllProducts";
import getAllCategories from "@/lib/api/woocommerce/getAllCategories";
import getAllTags from "@/lib/api/woocommerce/getAllTags";
import buildCategoryTree from "@/lib/breadcrumbs/buildCategoryTree";
import Breadcrumbs from "@/ui/Breadcrumbs";
import React from "react";

export const metadata: Metadata = {
    title: "Woo store - shop"
};

interface ShopPageProps {
    searchParams: Record<string, string | undefined>;
}

export default async function ShopPage({searchParams}: ShopPageProps) {
    const params = await searchParams;

    // search
    const search = params.search ?? "";

    // categories
    const categoryIds = params.categories
        ? params.categories.split(",").map(Number)
        : [];

    // tags
    const tagIds = params.tags
        ? params.tags.split(",").map(Number)
        : [];

    // price
    const minPrice = params.min_price
        ? Number(params.min_price)
        : undefined;

    const maxPrice = params.max_price
        ? Number(params.max_price)
        : undefined;

    // sidebar data
    const categories = await getAllCategories({per_page: 100});
    const categoriesTree = buildCategoryTree(categories);

    const tags = await getAllTags({per_page: 100});

    // products
    const products = await getAllProducts({
        per_page: 20,
        search,
        category: categoryIds.length
            ? categoryIds.join(",")
            : undefined,
        tag: tagIds.length
            ? tagIds.join(",")
            : undefined,
        min_price: minPrice,
        max_price: maxPrice,
    });

    const breadcrumbs = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "Shop",
            href: "/shop"
        },
    ];

    return (
        <>
            <div className={"mb-4"}>
                <Breadcrumbs items={breadcrumbs}/>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar
                    categories={categoriesTree}
                    tags={tags}
                    initialSearch={search}
                    initialCategories={categoryIds}
                    initialTags={tagIds}
                />

                <main className="w-full lg:w-4/5">
                    <ProductsGrid products={products}/>
                </main>
            </div>
        </>
    );
}
