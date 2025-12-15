import Image from "next/image";
import StockImage from "../../public/woocommerce-placeholder.webp";
import Link from "next/link";
import React, {JSX} from "react";
import ProductCategory from "@/types/ProductCategory";
import Product from "@/types/Product";
import {isProduct} from "@/app/utils/CheckEntyties";
import {IoIosArrowRoundForward} from "react-icons/io";
import OnSaleBadge from "@/components/single-product/OnSaleBadge";
import ProductPrice from "@/components/single-product/ProductPrice";

interface CardProps {
    item: ProductCategory | Product;
    children?: JSX.Element;
}

export default function Card({item, children}: CardProps) {

    console.log(item)

    const itemPath = isProduct(item) ? `/product/${item.slug}` : `/product-category/${item.slug}`;

    return (
        <div className="bg-neutral-primary-soft border border-gray-200 rounded shadow overflow-hidden flex flex-col">

            <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[3/2] lg:aspect-[3/3]">

                {(isProduct(item) && item.on_sale) && <OnSaleBadge/>}

                <Link href={itemPath} >
                    <Image fill
                           className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                           src={
                               isProduct(item)
                                   ? item.images?.[0]?.src ?? StockImage
                                   : item.image?.src ?? StockImage
                           }
                           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                           alt={
                               isProduct(item)
                                   ? item.images?.[0]?.alt ?? item.name
                                   : item.image?.alt ?? item.name
                           }
                           draggable={false}
                    />
                </Link>

            </div>


            <div className="p-6 flex flex-col flex-1 justify-between">

                {isProduct(item) ? (
                    <div className={"flex flex-wrap gap-2 justify-between items-center mb-4"}>
                        <Link href={itemPath} className="text-sm font-semibold tracking-tight text-heading">
                            {item.name}
                        </Link>

                        <ProductPrice product={item} className={"text-xs"} />
                    </div>
                ) :  <h5 className="mb-6 text-xl font-semibold tracking-tight text-center text-heading">
                    {item.name}
                </h5> }

                {children && children}

                {!isProduct(item) &&
                    <Link href={itemPath}
                          className="inline-flex items-center justify-center text-white bg-gray-900 hover:bg-gray-700 border border-transparent hover:bg-brand-strong font-medium rounded text-sm px-4 py-2.5 focus:outline-none">
                        <span>View</span>
                        <IoIosArrowRoundForward size={20}/>
                    </Link>}

            </div>
        </div>
    );
}
