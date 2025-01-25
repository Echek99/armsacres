import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import FeaturedCard from "@/components/FeaturedCard";
import { Metadata } from "next";

const options = { next: { revalidate: 3600 } };
export type paramsType = { slug: string };

// **1. Define Metadata Function**
export async function generateMetadata({ params }: { params: paramsType }): Promise<Metadata> {
    const categories = await client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options);
    const category = categories.find((e) => e.slug.current === params.slug);

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

// **2. Define the Page Component**
const page = async ({ params }: { params: paramsType }) => {
    const categories = await client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options);
    const products = await client.fetch<SanityDocument[]>(PRODUCTS_QUERY, {}, options);
    const { slug } = params;

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
                {filteredProducts.map((product) => (
                    <FeaturedCard key={product._id} product={product} imgSize={300}/>
                ))}
            </div>
        </div>
    );
};

export default page;
