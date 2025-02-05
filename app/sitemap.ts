import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://armsacres.io";

  // Fetch products from Sanity
  const products = await client.fetch(PRODUCTS_QUERY);

  // Generate product entries for the sitemap
  const productEntries = products.map((product: { category: { slug: { current: string } }, slug: { current: string }, _createdAt: string }) => ({
    url: `${baseUrl}/${product.category.slug.current}/${product.slug.current}`,
    lastModified: new Date(product._createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Static entries for categories and other pages
  const staticEntries = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/eighths`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ounces`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/edibles`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/pre-rolls`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/vapes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  // Combine static and dynamic entries
  return [...staticEntries, ...productEntries];
}