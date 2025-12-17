import Link from "next/link";
import clsx from "clsx";
import ProductCategory from "@/types/ProductCategory";
import {FaRegCircle} from "react-icons/fa";
import {JSX, ReactElement} from "react";

interface CategoryLinkProps {
    category: ProductCategory;
    categoryBasePath: string;
    className?: string;
    icon?: JSX.Element;
}

const CategoryLink: React.FC<CategoryLinkProps> = ({ category,categoryBasePath, className, icon }) => {
    const {name, slug} = category;
    return (
        <Link href={`/${categoryBasePath}/${slug}`}
            className={clsx(
                "text-white text-sm bg-gray-900 hover:bg-gray-700 rounded inline-flex justify-start items-center px-2 italic",
                className
            )}>

            {icon}

            {name}
        </Link>
    );
};

export default CategoryLink;
