import Image from "next/image"
import { CATEGORIES_QUERY } from "@/sanity/lib/queries"
import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";

const options = { next: { revalidate: 3600 } };

export default async function Categories() {

    // Fetch categories and products
    const categories = await client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options);

    return (
        <div className="container mx-auto p-8 flex flex-col gap-4">
            <h3 className="text-5xl underline titles text-center">MENU</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {categories.map((category) => {
                    return (
                        <div key={category._id} className="text-center mx-auto ml-auto">
                            <Link href={`/${category.slug.current}`} className="links uppercase text-3xl">
                                <Image
                                    src={category.imageUrl}
                                    alt={`${category.title} cover`}
                                    width={200}
                                    height={200}
                                    className="rounded-2xl"
                                />
                                {category.title}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}