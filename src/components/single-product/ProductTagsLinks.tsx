import CategoryLink from "@/ui/CategoryLink";
import ProductCategory from "@/types/ProductCategory";
import {JSX} from "react";
import ProductTag from "@/types/ProductTag";

interface ProductTagsProps {
    categories: ProductCategory[] | ProductTag[],
    categoriesBasePath: string,
    className: string,
    icon?: JSX.Element;
}

export default function ProductTagsLinks({categories,categoriesBasePath, className, icon}: ProductTagsProps) {

    if (!categories || categories.length === 0) return <></>; // optional fallback

    return (
        <>
            <div className={"flex flex-wrap"}>
                {categories.map((category: ProductCategory, index: number) => (
                    <CategoryLink
                        key={index}
                        categoryBasePath={categoriesBasePath}
                        category={category}
                        className={className}
                        icon={icon}
                    />
                ))}
            </div>

        </>
    )
}