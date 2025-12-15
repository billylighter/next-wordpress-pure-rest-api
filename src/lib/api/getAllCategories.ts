import { WooCategory } from "@/types/woocommerce";
import { WC_BASE_URL } from "../woocommerce/config";

export async function getAllCategories(
    params: Record<string, string | number | boolean> = {}
): Promise<WooCategory[]> {
    try {
        const url = new URL(`${WC_BASE_URL}/products/categories`);

        url.searchParams.set("per_page", "100");

        Object.entries(params).forEach(([key, value]) => {
            if (typeof value === "boolean") {
                url.searchParams.set(key, value ? "1" : "0");
            } else {
                url.searchParams.set(key, value.toString());
            }
        });

        const token = Buffer.from(
            `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
        ).toString("base64");

        const res = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Authorization: `Basic ${token}`,
            },
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(
                `Failed to fetch WooCommerce categories: ${res.status} ${text}`
            );
        }

        return (await res.json()) as WooCategory[];
    } catch (error) {
        console.error("Error in getAllCategories:", error);
        return [];
    }
}
