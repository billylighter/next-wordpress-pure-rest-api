// app/shop/page.tsx
import Sidebar from "@/components/shop/sidebar/Sidebar";
import ProductsGrid from "@/components/shop/ProductsGrid";
import getAllProducts from "@/lib/api/woocommerce/getAllProducts";
import getAllCategories from "@/lib/api/woocommerce/getAllCategories";
import getAllTags from "@/lib/api/woocommerce/getAllTags";
import buildCategoryTree from "@/utils/buildCategoryTree";

export default async function ShopPage({ searchParams }) {

    const params = await searchParams;

    const search = params.search ?? "";

    const categoryIds = params.categories
        ? params.categories.split(",").map(Number)
        : [];

    const tagIds = params.tags
        ? params.tags.split(",").map(Number)
        : [];

    const categories = await getAllCategories({ per_page: 100 });
    const categoriesTree = buildCategoryTree(categories);

    const tags = await getAllTags({ per_page: 100 });

    const products = await getAllProducts({
        per_page: 20,
        search,
        category: categoryIds.length ? categoryIds.join(",") : undefined,
        tag: tagIds.length ? tagIds.join(",") : undefined,
    });

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <Sidebar
                categories={categoriesTree}
                tags={tags}
                initialSearch={search}
                initialCategories={categoryIds}
                initialTags={tagIds}
            />

            <main className="w-full lg:w-4/5">
                <ProductsGrid products={products} />
            </main>
        </div>
    );
}
