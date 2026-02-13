import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/shared/config/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.openGraph.url;

  // In a real app, you would fetch your dynamic routes (e.g., blog posts) here
  // and map them into the sitemap array.

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Example dynamic route:
    // ...posts.map(post => ({
    //   url: `${baseUrl}/blog/${post.slug}`,
    //   lastModified: post.updatedAt,
    // }))
  ];
}
