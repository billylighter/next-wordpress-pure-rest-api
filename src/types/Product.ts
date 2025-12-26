import ProductImage from "@/types/ProductImage";
import ProductCategory from "@/types/ProductCategory";
import ProductTag from "@/types/ProductTag";
import WooProductAttribute from "@/types/WooProductAttribute";

type Product = {
    id: number;
    name: string;
    sku: string;
    rating_count: string;
    slug: string;
    price: string;
    regular_price: string;
    short_description: string;
    description: string;
    image?: undefined;
    images?: ProductImage[] | undefined;
    on_sale: boolean;

    categories: ProductCategory[];
    tags: ProductTag[];
    grouped_products: number[];
    variations: Product[] | [];
    attributes: WooProductAttribute[] | [];
};

export default Product;