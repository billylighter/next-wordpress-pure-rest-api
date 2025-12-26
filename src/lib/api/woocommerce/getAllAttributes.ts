import { WC_BASE_URL, WC_TOKEN } from "../../woocommerce/config";
import WooRequestProps from "@/types/api/woocommerce/WooRequestProps";
import buildSearchParams from "@/utils/buildSearchParams";

export interface ProductAttribute {
    id: number;
    name: string;
    slug: string;
    type: string;
    order_by: string;
    has_archives: boolean;
}

export default async function getAllAttributes(
    params: WooRequestProps = {}
): Promise<ProductAttribute[]> {
    try {
        const endpoint = new URL(`${WC_BASE_URL}/products/attributes`);

        // Append query params if provided
        buildSearchParams(endpoint, params);

        const response = await fetch(endpoint.toString(), {
            headers: {
                Authorization: `Basic ${WC_TOKEN}`,
            },
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`);
        }

        return (await response.json()) as ProductAttribute[];
    } catch (error) {
        console.error("Error in getAllAttributes:", error);
        return [];
    }
}
