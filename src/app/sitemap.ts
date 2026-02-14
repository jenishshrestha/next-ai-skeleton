import { MetadataRoute } from 'next';
import { siteConfig } from '@/shared/config/site';
import { getAllDocs } from '@/features/docs/api/get-doc';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getAllDocs();

  const docRoutes = docs.map((doc) => ({
    url: `${siteConfig.url}/docs/${doc.slug}`,
    lastModified: new Date(doc.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const routes = ['', '/login', '/forgot-password', '/docs'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  return [...routes, ...docRoutes];
}
