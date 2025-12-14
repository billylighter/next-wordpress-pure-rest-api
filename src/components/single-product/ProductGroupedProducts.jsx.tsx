"use client";
import Product from "@/types/Product";
import Image from "next/image";
import StockImage from "../../../public/woocommerce-placeholder.webp";
import Link from "next/link";

interface ProductGroupedProductsProps {
    products: Product[];
    className?: string;
}

export default function ProductGroupedProducts({products, className}: ProductGroupedProductsProps) {
    if (!products || products.length === 0) return;

    return (
        <div className={`overflow-x-auto ${className || ""}`}>
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 opacity-0">Image</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                    {/*<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">SKU</th>*/}
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Categories</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                        {/* IMAGE */}
                        <td className="px-4 py-2">
                            <Link href={`/product/${product.slug}`}>
                                <Image
                                    src={product.images?.[0]?.src || StockImage}
                                    alt={product.images?.[0]?.alt || product.name}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                            </Link>

                        </td>

                        {/* NAME */}
                        <td className="px-4 py-2 text-sm text-gray-900">
                            <Link href={`/product/${product.slug}`} className={"text-blue-600"}>{product.name}</Link>
                        </td>

                        {/* SKU */}
                        {/*<td className="px-4 py-2 text-sm text-gray-500">{product.sku || "-"}</td>*/}

                        {/* PRICE */}
                        <td className="px-4 py-2 text-sm text-gray-900">
                            <span className="font-semibold">{product.price} USD</span>
                        </td>

                        {/* CATEGORIES */}
                        <td className="px-4 py-2 text-sm text-gray-700">
                            {product.categories?.map((cat) => cat.name).join(", ") || "-"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
