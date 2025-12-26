import { WC_BASE_URL, WC_TOKEN } from "../../woocommerce/config";
import WooRequestProps from "@/types/api/woocommerce/WooRequestProps";
import buildSearchParams from "@/utils/buildSearchParams";
import Product from "@/types/Product";

export default async function getProductVariations(
    productId: number,
    params: WooRequestProps = {}
): Promise<Product[]> {
    try {
        if (!productId) {
            throw new Error("Product ID is required to fetch variations.");
        }

        const endpoint = new URL(`${WC_BASE_URL}/products/${productId}/variations`);

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

        return (await response.json()) as Product[];
    } catch (error) {
        console.error("Error in getProductVariations:", error);
        return [];
    }
}
