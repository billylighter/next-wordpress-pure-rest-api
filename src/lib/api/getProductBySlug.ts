"use server";
import Product from "@/types/Product";


export default async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
        const url = `${process.env.WORDPRESS_URL}/wp-json/wc/v3/products?slug=${slug}`;

        const token = Buffer
            .from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`)
            .toString("base64");

        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Basic ${token}`,
            },
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            console.error("Failed to fetch products:", res.status);
            return null;
        }

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            return null;
        }

        return data[0] as Product;

    } catch (error) {
        console.error("Error getProductBySlug:", error);
        return null;
    }
}
