import {WC_BASE_URL, WC_TOKEN} from "../../woocommerce/config";
import Product from "@/types/Product";
import buildSearchParams from "@/utils/buildSearchParams";
import WooRequestProps from "@/types/api/woocommerce/WooRequestProps";

export default async function getAllProducts(params: WooRequestProps = {}): Promise<Product[]> {

    try {
        const endpoint = new URL(`${WC_BASE_URL}/products`);

        buildSearchParams(endpoint, params);

        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                Authorization: `Basic ${WC_TOKEN}`,
            },
            next: {revalidate: 0},
        });

        return (await response.json()) as Product[];

    } catch (error) {

        console.error("Error in getAllProducts:", error);

        return [];

    }

}
