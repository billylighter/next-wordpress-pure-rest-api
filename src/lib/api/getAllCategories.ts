import {WC_BASE_URL, WC_TOKEN} from "../woocommerce/config";
import ProductCategory from "@/types/ProductCategory";
import WooRequestProps from "@/types/api/woocommerce/WooRequestProps";
import buildSearchParams from "@/utils/buildSearchParams";

export async function getAllCategories(params : WooRequestProps): Promise<ProductCategory[]> {
    try {

        const endpoint = new URL(`${WC_BASE_URL}/products/categories`);

        buildSearchParams(endpoint, params);

        const response = await fetch(endpoint.toString(), {
            headers: {
                Authorization: `Basic ${WC_TOKEN}`,
            },
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(
                `Failed to fetch WooCommerce categories: ${response.status} ${text}`
            );
        }

        return (await response.json()) as ProductCategory[];
    } catch (error) {
        console.error("Error in getAllCategories:", error);
        return [];
    }
}
