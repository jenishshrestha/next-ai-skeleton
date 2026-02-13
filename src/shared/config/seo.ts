import { Metadata } from 'next';

export const SEO_CONFIG = {
  title: {
    default: 'next-ai-skeleton | AI-Ready Next.js Template',
    template: '%s | next-ai-skeleton',
  },
  description: 'A professional, AI-ready Next.js skeleton designed for speed and scalability.',
  keywords: ['nextjs', 'react', 'typescript', 'ai', 'skeleton', 'template', 'fdd'],
  authors: [{ name: 'jenish' }],
  creator: 'jenish',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://next-ai-skeleton.vercel.app',
    siteName: 'next-ai-skeleton',
    title: 'next-ai-skeleton | AI-Ready Next.js Template',
    description: 'A professional, AI-ready Next.js skeleton designed for speed and scalability.',
    images: [
      {
        url: 'https://next-ai-skeleton.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'next-ai-skeleton',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'next-ai-skeleton | AI-Ready Next.js Template',
    description: 'A professional, AI-ready Next.js skeleton designed for speed and scalability.',
    images: ['https://next-ai-skeleton.vercel.app/og-image.png'],
    creator: '@jenishhrestha.31',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const defaultMetadata: Metadata = {
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  authors: SEO_CONFIG.authors,
  creator: SEO_CONFIG.creator,
  openGraph: SEO_CONFIG.openGraph,
  twitter: SEO_CONFIG.twitter,
  robots: SEO_CONFIG.robots,
  metadataBase: new URL(SEO_CONFIG.openGraph.url),
};
