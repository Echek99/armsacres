import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";

const options = { next: { revalidate: 3600 } };

// Explicitly define the type for dynamic route params

export default async function ProductPage({ params } : {params: {slug: string, productSlug: string}}) {
  // Fetch categories and products
  const products = await client.fetch<SanityDocument[]>(PRODUCTS_QUERY, {}, options);

  // Find the product based on category and product slug
  const product = products.find(
    (product) => product.slug.current === params.productSlug
  );

  if (!product) {
    return <div className="text-center text-xl mt-10">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-5 min-h-screen relative">
      <Link href={`/${product.category.slug.current}`} className="hover:underline oswald">
        ← Back to {product.category.title}
      </Link>
      <div className="flex flex-col lg:flex-row items-center lg:items-center relative">
        <div className="w-full lg:w-1/2 mt-10">
          {/* Category title and product title for small screens */}
          <div className="block lg:hidden">
            <p className="italic oswald text-gray-500">{product.category.title}</p>
            <h1 className="text-4xl uppercase font-bold mb-4 titles">{product.title}</h1>
          </div>
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          )}
        </div>
        <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
          {/* Category title and product title for large screens */}
          <div className="hidden lg:block relative">
            <p className="italic oswald text-gray-500">{product.category.title}</p>
            <h1 className="text-4xl uppercase font-bold titles">{product.title}</h1>
          </div>
          {product.additionalInfo ? (
            <p
              className={
                product?.additionalInfo.strain === "Sativa"
                  ? "bg-yellow-500 text-white p-1.5 w-min rounded font-bold oswald uppercase"
                  : "bg-purple-500 text-white p-1.5 w-min rounded font-bold oswald uppercase"
              }
            >
              {product?.additionalInfo.strain}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
