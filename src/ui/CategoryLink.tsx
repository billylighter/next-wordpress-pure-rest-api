import Link from "next/link";
import clsx from "clsx";
import ProductCategory from "@/types/ProductCategory";
import {FaRegCircle} from "react-icons/fa";

interface CategoryLinkProps {
    category: ProductCategory;
    categoryBasePath: string;
    className?: string;
}

const CategoryLink: React.FC<CategoryLinkProps> = ({ category,categoryBasePath, className }) => {
    const {name, slug} = category;
    return (
        <Link href={`/${categoryBasePath}/${slug}`}
            className={clsx(
                "text-white text-sm bg-gray-900 hover:bg-gray-700 rounded inline-flex justify-start items-center px-2 italic",
                className
            )}>
            <FaRegCircle size={10} className={"me-1"} />

            {name}
        </Link>
    );
};

export default CategoryLink;
