import ProductCategory from "@/types/ProductCategory";

export default async function getChildCategoriesBySlug(
    category: ProductCategory,
    params: {
        hide_empty?: boolean,
        per_page?: number
    }
): Promise<ProductCategory[]> {

    const parentCategory = await category;

    if (!parentCategory) return [];

    const url = new URL(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products/categories`
    );

    url.searchParams.set("parent", parentCategory.id.toString());

    Object.entries(params).forEach(([key, value]) => {
        if (typeof value === "boolean") {
            url.searchParams.set(key, value ? "1" : "0"); // WooCommerce uses 1/0 for booleans
        } else {
            url.searchParams.set(key, value.toString());
        }
    });

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
            ).toString("base64")}`,
        },
        next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    return await res.json();
}
