import React, {Suspense} from "react";
import getAllProducts from "@/lib/api/woocommerce/getAllProducts";
import ProductsGrid from "@/components/shop/ProductsGrid";
import Sidebar from "@/components/shop/sidebar/Sidebar";

interface PageProps {
    params: {
        slug: string[];
    };
}

export default async function ShopPage({params}: PageProps) {

    const products = await getAllProducts({per_page: 20});

    return (
        <>

            <header className="text-center mt-4 mb-6">
                <h1 className="text-xl font-semibold">Shop</h1>
            </header>

            <div className="flex flex-col lg:flex-row lg:gap-12 gap-6">

                <Sidebar className={"w-full lg:w-1/5"}/>

                <main className="w-full lg:w-4/5">
                    <ProductsGrid products={products}/>
                </main>

            </div>


        </>
    );
}
