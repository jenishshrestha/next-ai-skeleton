import { siteConfig } from '@/shared/config/site';

/**
 * Component to inject structured data (JSON-LD) for SEO.
 * This helps search engines understand the content and provide rich results.
 */
export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          author: {
            '@type': 'Person',
            name: siteConfig.author.name,
          },
        }),
      }}
    />
  );
}
