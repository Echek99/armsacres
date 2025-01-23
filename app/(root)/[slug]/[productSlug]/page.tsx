import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";

const options = { next: { revalidate: 30 } };

// Explicitly define the type for dynamic route params
export type paramsType = Promise<{ productSlug: string }>;

// Define the query to fetch a single product by its slug
const query = `*[_type == "product" && slug.current == $slug][0]{
    title,
    slug,
    "imageUrl": image.asset->url,
    price,
    category->{
      slug,
      title,
      categoryDeal
    },
    description,
    additionalInfo,
}`;

export default async function ProductPage(props: { params: paramsType }) {
  const { productSlug } = await props.params;

  // Fetch the product data based on the slug
  const product = await client.fetch<SanityDocument>(query, { slug: productSlug }, options);

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
            <h1 className="text-4xl uppercase font-bold titles">{product.title}</h1>
            <div className="flex align-center">
            <p className="oswald text-2xl mb-4 text-gray-700">${product.price} - {product.category.categoryDeal}</p>
            </div>
          </div>
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={`${product.title} cover`}
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
            <p className="oswald text-2xl mb-4 text-gray-700">${product.price} - {product.category.categoryDeal}</p>
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
          {/* Safely render the description */}
          <div dangerouslySetInnerHTML={{ __html: product.description }} className="product-description mt-10" />
        </div>
      </div>
    </div>
  );
}
``