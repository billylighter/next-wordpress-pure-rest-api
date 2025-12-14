import { WooCategory } from "@/types/woocommerce";
import { WC_BASE_URL } from "../woocommerce/config";

export async function getAllCategories(): Promise<WooCategory[]> {

    const url = `${WC_BASE_URL}/products/categories?per_page=100`;

    const token = Buffer
        .from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`)
        .toString("base64");

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Basic ${token}`,
        },
        next: { revalidate: 3600 },
    });

    return await res.json();
}
