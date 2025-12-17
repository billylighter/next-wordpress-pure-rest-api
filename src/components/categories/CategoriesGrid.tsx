import React from "react";
import ProductCategory from "@/types/ProductCategory";
import Card from "@/components/Card";
import Product from "@/types/Product";
import NoItemsFound from "@/components/NoItemsFound";

interface ParentCategoriesProps {
    data: ProductCategory[] | Product[];
}

export default function CategoriesGrid({data}: ParentCategoriesProps) {
    return (
        <>
            {data.length === 0 ? (
                <NoItemsFound
                    title="Nothing here yet"
                    description={<>
                        Looks like this category is empty.
                        <br />
                        Check back later or remove some filters.
                    </>}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((cat: ProductCategory | Product) => (
                        <Card item={cat} key={cat.id}/>
                    ))}
                </div>
            )}
        </>
    );
}
