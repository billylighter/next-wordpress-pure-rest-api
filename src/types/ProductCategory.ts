type ProductCategory = {
    id: number;
    name: string;
    slug: string;
    parent: number;
    description?: string;
    image?: undefined;
    images?: undefined;
    parentCategory?: ProductCategory;
}

export default ProductCategory;