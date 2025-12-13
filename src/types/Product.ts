import ProductImage from "@/types/ProductImage";
import ProductCategory from "@/types/ProductCategory";

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
    images: ProductImage[];
    categories: ProductCategory[];
    grouped_products: number[]
};

export default Product;