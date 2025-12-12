import ProductCategory from "@/types/ProductCategory";

export default async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
    const url = new URL(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products/categories`);
    url.searchParams.set("slug", slug);

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
            ).toString("base64")}`,
        },
        next: { revalidate: 60 },
    });

    console.log(res)

    if (!res.ok) return null;

    const data = await res.json();

    return data.length > 0 ? data[0] : null;
}
