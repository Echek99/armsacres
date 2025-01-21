// app/[categorySlug]/page.tsx

import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link"
import FeaturedCard from "@/components/FeaturedCard";

const options = { next: { revalidate: 3600 } };

export default async function CategoryPage({
    params,
}: {
    params: { slug: string };
}) {
    // Fetch categories and products (two separate queries)
    const categories = await client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options);
    const products = await client.fetch<SanityDocument[]>(PRODUCTS_QUERY, {}, options);

    // Find the category based on the slug
    const category = categories.find((e) => e.slug.current === params.slug);

    if (!category) {
        return (
            <div className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
                <p>Category not found</p>
                <Link href="/" className="hover:underline">
                    ← Back to Homepage
                </Link>
            </div>
        );
    }

    // Filter products by category slug
    const filteredProducts = products.filter(
        (product) => product.category?.slug?.current === params.slug
    );

    return (
        <div className="container mx-auto min-h-screen  p-8 flex flex-col gap-4">
            <Link href="/" className="hover:underline oswald">
                ← Back to Homepage
            </Link>
            <div className="prose oswald font-thin text-xl">
                <h1 className="text-5xl font-bold uppercase titles mt-5 mb-2">{category.title}</h1>
                <p>{category.description}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {filteredProducts.map((product) => {
                    return (
                        <FeaturedCard key={product._id} product={product} imgSize={300}/>
                    );
                })}
            </div>
        </div>
    );
}
