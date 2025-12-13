"use server";



import getProductBySlug from "@/lib/api/getProductBySlug";
import Image from "next/image";
import StockImage from "../../../../public/woocommerce-placeholder.webp";
import {IoIosCart} from "react-icons/io";
import ProductCategories from "@/components/products/ProductCategories";

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export default async function ProductPage({params}: ProductPageProps) {
    const {slug} = await params;

    const product = await getProductBySlug(slug);

    if (!product) {
        return <div>Product not found</div>;
    }


    console.log(product)

    return (
        <div className="container mx-auto py-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* LEFT SIDE: IMAGES */}
                <div>
                    {product.images?.length > 0 ? (
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

                {/* RIGHT SIDE: PRODUCT INFO */}
                <div className="flex flex-col gap-6">


                    <ProductCategories categories={product.categories} className={""} />

                    {/* HEADER / PRODUCT TITLE */}
                    <h1 className="text-3xl font-bold">{product.name}</h1>

                    <hr className={"text-gray-700"}/>

                    {/* PRICE */}
                    <div>
                        <p className="text-2xl font-semibold text-gray-900">
                            {product.price} USD
                        </p>
                        {product.regular_price && product.regular_price !== product.price && (
                            <p className="line-through text-gray-400">
                                {product.regular_price} USD
                            </p>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    <div
                        className="prose max-w-none text-gray-700 description"
                        dangerouslySetInnerHTML={{__html: product.description}}
                    />

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
