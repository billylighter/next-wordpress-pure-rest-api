import CategoryLink from "@/ui/CategoryLink";
import ProductCategory from "@/types/ProductCategory";

interface ProductCategoriesProps {
    categories: ProductCategory[],
    categoriesBasePath: string,
    className: string,
}

export default function ProductCategoriesLinks({categories,categoriesBasePath, className}: ProductCategoriesProps) {

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
                    />
                ))}
            </div>

        </>
    )
}