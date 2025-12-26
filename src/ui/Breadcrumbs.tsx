import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href: string;
}

export default function Breadcrumbs(
    {
        items,
    }: {
        items: BreadcrumbItem[];
    }) {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2 text-sm text-gray-600">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex gap-2">
                            {index > 0 && <span>/</span>}

                            {isLast ? (
                                <span
                                    aria-current="page"
                                    className="font-medium text-gray-600">
                                    {item.label}
                                </span>
                            ) : (
                                <Link href={item.href}
                                    className="hover:underline">
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
