"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Next 13+ App Router

export default function Breadcrumbs() {
    const pathname = usePathname(); // e.g., "/products/categories/shoes"
    const segments = pathname.split("/").filter(Boolean); // ["products", "categories", "shoes"]

    let path = "";

    return (
        <nav aria-label="breadcrumb" className="text-xs">
            <ol className="flex gap-2 uppercase">
                <li>
                    <Link href="/">Home</Link>
                    <span className="mx-1">/</span>
                </li>

                {segments.map((segment, index) => {
                    path += `/${segment}`;
                    const isLast = index === segments.length - 1;

                    return (
                        <li key={path}>
                            {isLast ? (
                                <span className="font-semibold">{decodeURIComponent(segment)}</span>
                            ) : (
                                <>
                                    <Link href={path}>{decodeURIComponent(segment)}</Link>
                                    <span className="mx-1">/</span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
