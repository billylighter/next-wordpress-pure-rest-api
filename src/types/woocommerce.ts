export interface WooCategory {
    id: number;
    name: string;
    slug: string;
    parent: number;
}

export interface WooProduct {
    id: number;
    name: string;
    slug: string;
    categories: WooCategory[];
}
