import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

const options = { next: { revalidate: 3600 } };

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
    additionalInfo{
      strain,
      productDeal
    },
    _createdAt
}`;

// Explicitly define the type for dynamic route params
export type paramsType = { slug: string; productSlug: string };

// Function to dynamically generate metadata
export async function generateMetadata({ params }: { params: Promise<paramsType> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await client.fetch<SanityDocument>(query, { slug: resolvedParams.productSlug }, options);

  if (!product) {
    return {
      title: "Product Not Found | Armsacres",
      description: "This product does not exist or is unavailable at the moment.",
    };
  }

  return {
    title: `${product.title} | ${product.category.title} | Weed Delivery NYC & NJ`,
    description: product.description
      ? product.description.substring(0, 150) + "..."
      : "Discover premium cannabis products available for delivery in NYC and NJ.",
    openGraph: {
      title: `${product.title} | ${product.category.title} | Weed Delivery NYC & NJ`,
      description: product.description
        ? product.description.substring(0, 150) + "..."
        : "Discover premium cannabis products available for delivery in NYC and NJ.",
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<paramsType> }) {
  const resolvedParams = await params;
  const product = await client.fetch<SanityDocument>(query, { slug: resolvedParams.productSlug }, options);

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
          <div className="block lg:hidden">
            <p className="italic oswald text-gray-500">{product.category.title}</p>
            <h1 className="text-4xl uppercase font-bold titles">{product.title}</h1>
            <p className="oswald text-2xl mb-4 text-gray-700">
              ${product.price} - {product.additionalInfo?.productDeal ? product.additionalInfo.productDeal : product.category.categoryDeal}
            </p>
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
          <div className="hidden lg:block relative">
            <p className="italic oswald text-gray-500">{product.category.title}</p>
            <h1 className="text-4xl uppercase font-bold titles">{product.title}</h1>
            <p className="oswald text-2xl mb-4 text-gray-700">
              ${product.price} - {product.additionalInfo?.productDeal ? product.additionalInfo.productDeal : product.category.categoryDeal}
            </p>
          </div>
          {product.additionalInfo?.strain && (
            <p
              className={
                product.additionalInfo.strain === "Sativa"
                  ? "bg-yellow-500 text-white p-1.5 w-min rounded font-bold oswald uppercase"
                  : "bg-purple-500 text-white p-1.5 w-min rounded font-bold oswald uppercase"
              }
            >
              {product.additionalInfo.strain}
            </p>
          )}
          <div dangerouslySetInnerHTML={{ __html: product.description }} className="product-description mt-10" />
        </div>
      </div>
    </div>
  );
}