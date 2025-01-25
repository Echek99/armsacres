import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { PortableText, toPlainText } from "@portabletext/react";
import { Metadata } from "next";

const options = { next: { revalidate: 3600 } };

export type paramsType = { slug: string };

export async function generateMetadata({ params }: { params: paramsType }): Promise<Metadata> {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    author,
    "publishedAt": coalesce(publishedAt, _createdAt),
    slug,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    text[] {
      ...,
      markDefs[] {
        ...,
        _type == "link" => {
          "href": @.href
        }
      }
    }
  }`;

  const blog = await client.fetch<SanityDocument>(query, { slug: params.slug }, options);

  if (!blog) {
    return {
      title: "Blog Post Not Found | Armsacres",
      description: "This blog post does not exist or is unavailable at the moment.",
    };
  }

  const plainText = toPlainText(blog.text);
  const description = plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText;

  return {
    title: `${blog.title} | Armsacres`,
    description,
    openGraph: {
      title: `${blog.title} | Armsacres`,
      description,
      images: [
        {
          url: blog.imageUrl,
          width: 800,
          height: 600,
          alt: blog.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: { params: paramsType }) {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    author,
    "publishedAt": coalesce(publishedAt, _createdAt),
    slug,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    text[] {
      ...,
      markDefs[] {
        ...,
        _type == "link" => {
          "href": @.href
        }
      }
    }
  }`;

  const blog = await client.fetch<SanityDocument>(query, { slug: params.slug }, options);

  if (!blog) {
    return <div className="text-center text-xl mt-10">Blog post not found</div>;
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(blog.publishedAt));

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <Link href="/blog" className="text-blue-500 hover:underline mb-5 block">
        ← Back to All Blogs
      </Link>
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-10">
        <div className="w-full lg:w-1/2">
          {blog.imageUrl && (
            <Image
              src={blog.imageUrl}
              alt={blog.imageAlt || "Blog post image"}
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          )}
        </div>
        <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
          <h1 className="text-4xl font-bold mb-4 oswald">{blog.title}</h1>
          <p className="text-gray-600 mb-2">By {blog.author}</p>
          <p className="text-gray-500 text-sm mb-4">Published on {formattedDate}</p>
          <PortableText value={blog.text} />
        </div>
      </div>
    </div>
  );
}