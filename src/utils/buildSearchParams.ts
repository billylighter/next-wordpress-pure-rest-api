import WooRequestProps from "@/types/api/woocommerce/WooRequestProps";

export default function buildSearchParams(
    url: URL,
    params: WooRequestProps
): void {
    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (typeof value === "boolean") {
            url.searchParams.set(key, value ? "1" : "0");
        } else {
            url.searchParams.set(key, String(value));
        }
    });
}
