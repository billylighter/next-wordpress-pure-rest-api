export type ProductCategory = {
    id: number;
    name: string;
    slug: string;
    count: number;
    description: string;
    image?: {
        src: string;
        alt: string;
    };
};

export default ProductCategory;