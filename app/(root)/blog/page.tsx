import { BLOG_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { toPlainText } from '@portabletext/react';

const options = { next: { revalidate: 3600 } };

const page = async () => {
  const blog = await client.fetch<SanityDocument[]>(BLOG_QUERY, {}, options);

  return (
    <div className="container mx-auto p-5 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center titles uppercase underline">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blog.map((post) => {
          const plainText = toPlainText(post.text);
          const truncatedText = plainText.length > 100 ? plainText.substring(0, 200) + '...' : plainText;

          return (
            <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={post.imageUrl}
                  alt={`${post.title} cover`}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-2xl font-bold mb-2 oswald">{post.title}</h2>
                <p className="text-gray-800 mb-4 oswald font-light text-lg">{truncatedText}</p>
                <Link href={`/blog/${post.slug.current}`} className="text-blue-500 hover:underline">
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;