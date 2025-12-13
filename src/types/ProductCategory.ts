import ProductImage from "@/types/ProductImage";

type ProductCategory = {
    id: number;
    count: number;
    name: string;
    slug: string;
    url: string;
    parent: number;
    description?: string;
    image?: ProductImage;
    images?: undefined;
    parentCategory?: ProductCategory;
}

export default ProductCategory;