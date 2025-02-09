import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import FeaturedCard from "@/components/FeaturedCard";
import { Metadata } from "next";

const options = { next: { revalidate: 1800 } };
export type paramsType = { slug: string };

export async function generateMetadata({ params }: { params: Promise<paramsType> }): Promise<Metadata> {
    const resolvedParams = await params;
    const categories = await client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options);
    const category = categories.find((e) => e.slug.current === resolvedParams.slug);

    if (!category) {
        return {
            title: "Category Not Found | Armsacres",
            description: "The requested category does not exist.",
        };
    }

    return {
        title: `${category.title} | Armsacres`,
        description: category.description || `Discover top products in ${category.title}.`,
        openGraph: {
            title: `${category.title} | Armsacres`,
            description: category.description || `Explore premium products in ${category.title}.`,
            images: [
                {
                    url: category.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: category.title,
                },
            ],
        },
    };
}

const PRODUCTS_PER_PAGE = 12;

const page = async ({
    params,
    searchParams,
}: {
    params: Promise<paramsType>;
    searchParams: { page?: string };
}) => {
    const resolvedParams = await params;
    const categories = await client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options);
    const products = await client.fetch<SanityDocument[]>(PRODUCTS_QUERY, {}, options);
    const { slug } = resolvedParams;

    const category = categories.find((e) => e.slug.current === slug);

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

    const filteredProducts = products.filter(
        (product) => product.category?.slug?.current === slug
    );

    // Sort products by _createdAt (newest first)
    const sortedProducts = [...filteredProducts].sort((a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );

    // Pagination Logic
    const currentPage = parseInt(searchParams?.page || "1", 10);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto min-h-screen p-8 flex flex-col gap-4">
            <Link href="/" className="hover:underline oswald">
                ← Back to Homepage
            </Link>
            <div className="prose oswald font-thin text-xl">
                <h1 className="text-5xl font-bold uppercase titles mt-5 mb-2">{category.title}</h1>
                <p>{category.description}</p>
                <p>{category.categoryDeal}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {paginatedProducts.map((product) => (
                    <FeaturedCard key={product._id} product={product} imgSize={300} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 gap-4">
                {currentPage > 1 && (
                    <Link href={`/${slug}?page=${currentPage - 1}`} className="px-4 py-2 bg-gray-200 rounded">
                       ← Previous Page
                    </Link>
                )}
                {endIndex < sortedProducts.length && (
                    <Link href={`/${slug}?page=${currentPage + 1}`} className="px-4 py-2 bg-gray-200 rounded">
                        Next Page →
                    </Link>
                )}
            </div>
        </div>
    );
};

export default page;
