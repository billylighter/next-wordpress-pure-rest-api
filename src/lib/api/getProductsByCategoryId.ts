export default async function getProductsByCategoryId(categoryId : number, params:{hide_empty: boolean}) {
    const url = new URL(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/products`);

    url.searchParams.set("category", categoryId.toString());

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

    return res.json();
}
