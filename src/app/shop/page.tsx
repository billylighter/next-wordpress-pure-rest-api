import React, {Suspense} from "react";
import {getAllProducts} from "@/lib/api/getAllProducts";
import ProductCategories from "@/components/shop/ProductCategories";
import ProductsGrid from "@/components/shop/ProductCategories";

interface PageProps {
    params: {
        slug: string[];
    };
}

export default async function ShopPage({params}: PageProps) {

    const products = await getAllProducts();


    return (
        <>

            <header className="text-center my-4">
                <h1 className="text-xl font-semibold">Shop</h1>
            </header>

            <ProductsGrid products={products}/>

        </>
    );
}
