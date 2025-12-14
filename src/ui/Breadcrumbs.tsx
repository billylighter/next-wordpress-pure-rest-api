import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href: string;
}

export default function Breadcrumbs({
                                        items
                                    }: {
    items: BreadcrumbItem[];
}) {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2 text-sm text-gray-600">
                {items.map((item, index) => (
                    <li key={index} className="flex gap-2">
                        {index > 0 && <span>/</span>}
                        <Link
                            href={item.href}
                            className="hover:underline">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
