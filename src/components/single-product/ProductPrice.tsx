import React from "react";
import Product from "@/types/Product";

interface ProductPriceProps {
    product: Product,
    className?: string;
}

export default function ProductPrice({product, className} : ProductPriceProps){

    // console.log(product);



    return (
        <div className={className}>
            <p className="font-semibold text-black">
                {product.price} USD
            </p>
            {product.regular_price && product.regular_price !== product.price && (
                <p className="line-through text-red-400">
                    {product.regular_price} USD
                </p>
            )}
        </div>
    )
}