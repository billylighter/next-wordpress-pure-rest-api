import { WC_BASE_URL, WC_TOKEN } from "../../woocommerce/config";
import ProductTag from "@/types/ProductTag";
import WooRequestProps from "@/types/api/woocommerce/WooRequestProps";
import buildSearchParams from "@/utils/buildSearchParams";

export default async function getAllTags(
    params: WooRequestProps = {}
): Promise<ProductTag[]> {
    try {
        const endpoint = new URL(`${WC_BASE_URL}/products/tags`);

        buildSearchParams(endpoint, params);

        const response = await fetch(endpoint.toString(), {
            headers: {
                Authorization: `Basic ${WC_TOKEN}`,
            },
            next: { revalidate: 0 },
        });

        return (await response.json()) as ProductTag[];
    } catch (error) {
        console.error("Error in getAllTags:", error);
        return [];
    }
}