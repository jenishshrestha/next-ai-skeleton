import { notFound } from 'next/navigation';
import { getDocBySlug, getAllDocs } from '@/features/docs/api/get-doc';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  return {
    title: doc ? `${doc.title} | next-ai-skeleton` : 'Docs',
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

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
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
