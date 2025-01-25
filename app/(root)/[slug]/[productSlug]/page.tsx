import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";

const options = { next: { revalidate: 3600 } };

export type paramsType = { slug: string; productSlug: string };

export async function generateMetadata({ params }: { params: paramsType }): Promise<Metadata> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
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
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
  }`;

  const product = await client.fetch<SanityDocument>(query, { slug: params.productSlug }, options);

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

export default async function ProductPage({ params }: { params: paramsType }) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
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
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
  }`;

  const product = await client.fetch<SanityDocument>(query, { slug: params.productSlug }, options);

  if (!product) {
    return <div className="text-center text-xl mt-10">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Link href={`/${product.category.slug.current}`} className="hover:underline oswald">
        ← Back to {product.category.title}
      </Link>
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-10">
        <div className="w-full lg:w-1/2">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt || "Product image"}
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          )}
        </div>
        <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">By {product.author}</p>
          <div dangerouslySetInnerHTML={{ __html: product.description }} className="product-description mt-10" />
        </div>
      </div>
    </div>
  );
}