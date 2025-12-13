import getCategoryBySlug from "@/lib/api/getCategoryBySlug";
import getProductsByCategoryId from "@/lib/api/getProductsByCategoryId";
import Product from "@/types/Product";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

export default async function CategoryPage({params}: CategoryPageProps) {

    const {slug} = await params;

    const category = await getCategoryBySlug(slug);

    if (!category) {
        return <div>Category not found</div>;
    }

    const products = await getProductsByCategoryId(category.id);

    console.log(products)

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: Product) => (
                    <Card item={product} key={product.id}>
                        <div className={"text-gray-500 mb-5"} dangerouslySetInnerHTML={{__html: product.short_description}}></div>
                    </Card>
                ))}
            </div>
        </>

    );
}
