import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/shared/config/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${SEO_CONFIG.openGraph.url}/sitemap.xml`,
  };
}
