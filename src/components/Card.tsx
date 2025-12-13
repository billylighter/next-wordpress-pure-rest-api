import Image from "next/image";
import StockImage from "../../public/woocommerce-placeholder.webp";
import Link from "next/link";
import React, {JSX} from "react";
import ProductCategory from "@/types/ProductCategory";
import Product from "@/types/Product";
import {isProduct} from "@/app/utils/CheckEntyties";
import {IoIosArrowRoundForward} from "react-icons/io";

interface CardProps {
    item: ProductCategory | Product;
    children?: JSX.Element;
}

export default function Card({ item, children }: CardProps) {

    return (
        <div className="bg-neutral-primary-soft border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">

            {/* IMAGE BLOCK */}
            <Image
                src={
                    isProduct(item)
                        ? item.images?.[0]?.src || StockImage
                        : item.image?.src || StockImage
                }
                alt={
                    isProduct(item)
                        ? item.images?.[0]?.alt || item.name
                        : item.image?.alt || item.name
                }
                width={400}
                height={200}
                className="w-full h-48 object-cover"
                draggable={false}
            />


            <div className="p-6 text-center flex flex-col flex-1 justify-between">

                <h5 className="mt-2 mb-4 text-xl font-semibold tracking-tight text-heading">
                    {item.name}
                </h5>

                {children}

                <Link
                    href={
                        isProduct(item)
                            ? `/product/${item.slug}`
                            : `/category/${item.slug}`
                    }
                    className="inline-flex items-center justify-center text-white bg-gray-900 hover:bg-gray-700 border border-transparent hover:bg-brand-strong font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none">
                    View

                    <IoIosArrowRoundForward size={20} />

                </Link>
            </div>
        </div>
    );
}
