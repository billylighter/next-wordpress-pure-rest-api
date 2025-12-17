import {FiSearch} from "react-icons/fi";
import {ReactNode} from "react";

interface NoProductsFoundProps {
    title?: string;
    description?: string | ReactNode;
}

export default function NoItemsFound(
    {
        title = "No products found",
        description = "We couldn’t find any items matching your filters. Try adjusting your search or explore other categories.",
    }: NoProductsFoundProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full py-20 px-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-6">
                <FiSearch className="h-7 w-7 text-gray-500"/>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
            </h2>

            <p className="max-w-md text-sm text-gray-500">
                {description}
            </p>
        </div>
    );
}
