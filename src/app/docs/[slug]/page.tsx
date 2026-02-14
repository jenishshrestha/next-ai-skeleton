import { notFound } from 'next/navigation';
import { getDocBySlug, getAllDocs } from '@/features/docs/api/get-doc';
import { Metadata } from 'next';

import { siteConfig } from '@/shared/config/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const ogUrl = `${siteConfig.url}/docs/${slug}`;

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: ogUrl,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
      authors: [doc.author],
      publishedTime: doc.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: ogUrl,
    },
  };
}

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export default async function DocDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: doc.title,
    description: doc.description,
    author: {
      '@type': 'Person',
      name: doc.author,
    },
    datePublished: doc.date,
    image: siteConfig.ogImage,
    url: `${siteConfig.url}/docs/${slug}`,
  };

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-4">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <time dateTime={doc.date}>
            {new Date(doc.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{doc.author}</span>
        </div>
        <h1 className="text-4xl leading-tight font-extrabold tracking-tighter md:text-5xl">
          {doc.title}
        </h1>
        <p className="text-muted-foreground text-xl leading-relaxed italic">{doc.description}</p>
      </header>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {doc.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}
