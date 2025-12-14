"use server";
import Product from "@/types/Product";

export default async function getProductsByIds(ids: number[]): Promise<Product[]> {
    if (!ids || ids.length === 0) return [];

    try {
        const url = new URL(`${process.env.WORDPRESS_URL}/wp-json/wc/v3/products`);
        url.searchParams.set("include", ids.join(",")); // WooCommerce expects comma-separated IDs

        const token = Buffer
            .from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`)
            .toString("base64");

        const res = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Authorization: `Basic ${token}`,
            },
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("Failed to fetch single-product:", res.status, text);
            return [];
        }

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            return [];
        }

        return data as Product[];
    } catch (error) {
        console.error("Error getProductsByIds:", error);
        return [];
    }
}
