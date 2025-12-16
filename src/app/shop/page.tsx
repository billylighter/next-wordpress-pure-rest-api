// app/shop/page.tsx
import getAllProducts from "@/lib/api/woocommerce/getAllProducts";
import Sidebar from "@/components/shop/sidebar/Sidebar";
import ProductsGrid from "@/components/shop/ProductsGrid";

interface PageProps {
    searchParams: Promise<{
        search?: string;
        categories?: string;
        per_page?: string;
    }>;
}

export default async function ShopPage({ searchParams }: PageProps) {

    const params = await searchParams;

    const search = params.search ?? "";
    const categoryIds = params.categories
        ? params.categories.split(",").map(Number)
        : [];

    const perPage = Number(params.per_page ?? 20);

    const products = await getAllProducts({
        per_page: perPage,
        search : search,
        category: categoryIds.length
            ? categoryIds.join(",")
            : undefined,
    });

    return (
        <>
            <header className="text-center mt-6 mb-8">
                <h1 className="text-2xl font-semibold">Shop</h1>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                <Sidebar
                    className="w-full lg:w-1/5"
                    initialSearch={search}
                    initialCategories={categoryIds}
                />

                <main className="w-full lg:w-4/5">
                    <ProductsGrid products={products} />
                </main>
            </div>
        </>
    );
}
