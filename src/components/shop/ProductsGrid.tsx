import React from "react";

import Card from "@/components/Card";
import Product from "@/types/Product";

interface ParentCategoriesProps {
    products: Product[];
}

export default function ProductsGrid({products}: ParentCategoriesProps) {
    return (
        <>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product: Product) => (
                        <Card item={product} key={product.id}>
                            <div className={"description text-xs leading-3"}
                                 dangerouslySetInnerHTML={{__html: product.short_description}}></div>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}
