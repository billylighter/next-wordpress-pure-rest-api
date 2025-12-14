import React from "react";
import ProductCategory from "@/types/ProductCategory";
import Card from "@/components/Card";

interface ParentCategoriesProps {
    categories: ProductCategory[];
}

export default function CategoriesGrid({categories}: ParentCategoriesProps) {
    return (
        <>
            {categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat: ProductCategory) => (
                        <Card item={cat} key={cat.id}/>
                    ))}
                </div>
            )}
        </>
    );
}
