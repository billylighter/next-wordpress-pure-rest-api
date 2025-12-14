import React from "react";
import ProductCategory from "@/types/ProductCategory";
import Card from "@/components/Card";
import Product from "@/types/Product";

interface ParentCategoriesProps {
    data: ProductCategory[] | Product[];
}

export default function CategoriesGrid({data}: ParentCategoriesProps) {
    return (
        <>
            {data.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((cat: ProductCategory | Product) => (
                        <Card item={cat} key={cat.id}/>
                    ))}
                </div>
            )}
        </>
    );
}
