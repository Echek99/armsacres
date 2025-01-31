import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import FeaturedCard from "@/components/FeaturedCard";
import { Metadata } from "next";

const options = { next: { revalidate: 30 } };
const ITEMS_PER_PAGE = 12;
export type paramsType = { slug: string };

export async function generateMetadata({ params }: { params: paramsType }): Promise<Metadata> {
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
                    url: category.imageUrl, // Ensure image field exists
                    width: 1200,
                    height: 630,
                    alt: category.title,
                },
            ],
        },
    };
}
const page = async ({
    params,
    searchParams
}: {
    params: paramsType;
    searchParams?: { sort?: string; page?: string };
}) => {
    const categories = await client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options);
    const products = await client.fetch<SanityDocument[]>(PRODUCTS_QUERY, {}, options);
    const { slug } = params;

    const category = categories.find((e) => e.slug.current === slug);
    const sortOrder = searchParams?.sort || 'desc';
    const currentPage = parseInt(searchParams?.page || '1', 10);

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

    const filteredProducts = products
        .filter((product) => product.category?.slug?.current === slug)
        .map(product => {
            const createdAt = new Date(product._createdAt);
            const updatedAt = product._updatedAt ? new Date(product._updatedAt) : null;
            return {
                ...product,
                latestDate: updatedAt && updatedAt > createdAt ? updatedAt : createdAt
            };
        })
        .sort((a, b) =>
            sortOrder === 'asc'
                ? a.latestDate.getTime() - b.latestDate.getTime()
                : b.latestDate.getTime() - a.latestDate.getTime()
        );

    // Pagination calculations
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="container mx-auto min-h-screen p-8 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <Link href="/" className="hover:underline oswald">
                    ← Back to Homepage
                </Link>
                <Link
                    href={`?sort=${sortOrder === 'desc' ? 'asc' : 'desc'}&page=1`}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Sort {sortOrder === 'desc' ? 'Oldest First' : 'Newest First'}
                </Link>
            </div>
            <div className="prose oswald font-thin text-xl">
                <h1 className="text-5xl font-bold uppercase titles mt-5 mb-2">{category.title}</h1>
                <p>{category.description}</p>
                <p className="mt-3 font-normal">{category.categoryDeal}</p>
                {category.title === 'Ounces' || category.title === 'Eighths' ?
                    <p className="font-bold oswald uppercase mt-10">
                        Available strains may vary weekly; stock is approximate.
                    </p>
                    :
                    null
                }
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {paginatedProducts.map((product) => (
                    <FeaturedCard key={product._id} product={product} imgSize={300} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    <Link
                        href={`?${new URLSearchParams({
                            sort: sortOrder,
                            page: Math.max(1, currentPage - 1).toString()
                        })}`}
                        className={`px-4 py-2 rounded-lg ${
                            currentPage === 1 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-gray-800 hover:bg-gray-700 text-white'
                        }`}
                    >
                        Previous
                    </Link>

                    {getPageNumbers().map((pageNumber) => (
                        <Link
                            key={pageNumber}
                            href={`?${new URLSearchParams({
                                sort: sortOrder,
                                page: pageNumber.toString()
                            })}`}
                            className={`px-4 py-2 rounded-lg ${
                                pageNumber === currentPage
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {pageNumber}
                        </Link>
                    ))}

                    <Link
                        href={`?${new URLSearchParams({
                            sort: sortOrder,
                            page: Math.min(totalPages, currentPage + 1).toString()
                        })}`}
                        className={`px-4 py-2 rounded-lg ${
                            currentPage === totalPages
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-gray-800 hover:bg-gray-700 text-white'
                        }`}
                    >
                        Next
                    </Link>
                </div>
            )}
        </div>
    );
};

export default page;