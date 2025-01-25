import FeaturedCard from "./FeaturedCard";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { type SanityDocument } from "next-sanity";

const options = { next: { revalidate: 3600 } };

const FeaturedProducts = async () => {
    const products = await client.fetch<SanityDocument[]>(PRODUCTS_QUERY, {}, options);

    // Group products by category
    const groupedByCategory = products.reduce<Record<string, SanityDocument[]>>(
        (acc, product) => {
            const category = product.category?.title || "Uncategorized";
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        },
        {}
    );


    return (
        <div className="m-5">
            {Object.entries(groupedByCategory).map(([category, categoryProducts]) => {
                // Sort products in this category by _createdAt (newest first)
                const sortedCategoryProducts = categoryProducts.sort(
                    (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
                );

                // Take only the newest 5 products for this category
                const newestCategoryProducts = sortedCategoryProducts.slice(0, 6);
                return (
                    <div key={category.toLocaleLowerCase()} className="my-10">
                        <h3 className="font-semibold mb-3 titles uppercase text-4xl underline">{category}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {newestCategoryProducts.map((product) => (
                                <div key={product._id} className="flex flex-col">
                                    <FeaturedCard product={product} imgSize={175} />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FeaturedProducts;