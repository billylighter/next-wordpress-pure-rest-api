"use server";



import getProductBySlug from "@/lib/api/getProductBySlug";
import Image from "next/image";
import StockImage from "../../../../public/woocommerce-placeholder.webp";
import {IoIosCart} from "react-icons/io";
import ProductCategoriesLinks from "@/components/single-product/ProductCategoriesLinks";
import getProductsByIds from "@/lib/api/getProductsByIds";
import ProductGroupedProducts from "@/components/single-product/ProductGroupedProducts.jsx";
import {getProductBreadcrumbs} from "@/lib/breadcrumbs/getProductBreadcrumbs";
import {notFound} from "next/navigation";
import Breadcrumbs from "@/ui/Breadcrumbs";
import {isProduct} from "@/utils/CheckEntyties";
import OnSaleBadge from "@/components/single-product/OnSaleBadge";
import React from "react";
import ProductPrice from "@/components/single-product/ProductPrice";

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export default async function ProductPage({params}: ProductPageProps) {
    const {slug} = await params;

    const product = await getProductBySlug(slug);

    if (!product) return notFound();

    const breadcrumbs = await getProductBreadcrumbs(product);

    const groupedProducts = await getProductsByIds(product.grouped_products);

    return (
        <div className="container mx-auto">

            <div className={"mb-4"}>
                <Breadcrumbs items={breadcrumbs} />
            </div>

            <div className="flex flex-wrap -mx-4">

                {/* LEFT SIDE: IMAGES */}
                <div className={"w-full md:w-2/5 px-4 mb-4"}>

                    <div className="relative">

                        {(isProduct(product) && product.on_sale) && <OnSaleBadge />}

                        {product.images && product.images.length > 0 ? (
                            <Image
                                src={product.images[0].src}
                                alt={product.images[0].alt || product.name}
                                width={500}
                                height={400}
                                className="w-full rounded-lg object-cover"
                                draggable={false}
                            />
                        ) : (
                            <Image
                                src={StockImage}
                                alt={product.name}
                                width={500}
                                height={400}
                                className="w-full h-auto rounded-lg"
                                draggable={false}
                            />
                        )}
                    </div>

                </div>

                {/* RIGHT SIDE: PRODUCT INFO */}
                <div className={"flex flex-col gap-2 w-full md:w-3/5 px-4"}>


                    <ProductCategoriesLinks categories={product.categories} className={""} />

                    <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-2 my-3">

                        {/* HEADER / PRODUCT TITLE */}
                        <h1 className="text-xl font-bold">{product.name}</h1>

                        {/* PRICE */}
                        <ProductPrice product={product} className={"text-lg"} />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="prose max-w-none text-gray-700 description mb-4"
                        dangerouslySetInnerHTML={{__html: product.description}}
                    />

                    <ProductGroupedProducts products={groupedProducts} />

                    {/* ADD TO CART (if needed later) */}
                    <button
                        className="inline-flex items-center justify-center text-white bg-gray-900 hover:bg-gray-700 border border-transparent hover:bg-brand-strong font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none min-w-[120px] cursor-pointer">
                        <IoIosCart size={18} className={"me-2"}/>
                        Add to cart

                    </button>

                </div>
            </div>
        </div>
    );
}
