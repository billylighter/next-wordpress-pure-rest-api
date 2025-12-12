import ProductCategory from "@/types/ProductCategory";

export default async function getParentProductCategories(): Promise<ProductCategory[]> {
    const url = new URL(`${process.env.WORDPRESS_URL}/wp-json/wc/v3/products/categories`);

    url.searchParams.set("parent", "0");
    url.searchParams.set("hide_empty", "1");

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
            ).toString("base64")}`,
        },
        next: { revalidate: 0 },
    });

    console.log(res);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch WooCommerce categories: ${res.status} ${text}`);
    }

    return res.json();
}
