import ProductImage from "@/types/ProductImage";

type Product = {
    id: number;
    name: string;
    sku: string;
    rating_count: string;
    slug: string;
    price: string;
    regular_price: string;
    short_description: string;
    images: ProductImage[];
};

export default Product;