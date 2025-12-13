type ProductCategory = {
    id: number;
    count: number;
    name: string;
    slug: string;
    url: string;
    parent: number;
    description?: string;
    image?: undefined;
    images?: undefined;
    parentCategory?: ProductCategory;
}

export default ProductCategory;