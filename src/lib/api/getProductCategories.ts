import ProductCategory from "@/types/ProductCategory";

export default async function getProductCategories(
    params: Record<string, string | number | boolean> = {}
): Promise<ProductCategory[]> {
    try {
        const url = new URL(`${process.env.WORDPRESS_URL}/wp-json/wc/v3/products/categories`);

        // Dynamically set all params in the URL
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
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Failed to fetch WooCommerce categories: ${res.status} ${text}`);
        }

        return await res.json() as ProductCategory[];
    } catch (error) {
        console.error("Error in getProductCategories:", error);
        return [];
    }
}
