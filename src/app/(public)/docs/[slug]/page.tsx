import { notFound } from 'next/navigation';
import { CMSDAL } from '@/features/cms/api/cms-dal';
import { ContentRenderer } from '@/features/cms/components/content-renderer';
import { constructMetadata } from '@/shared/lib/metadata';
import { JsonLd } from '@/shared/components/seo/json-ld';
import { format } from 'date-fns';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface DocPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = await CMSDAL.getDocBySlug(slug);

  if (!doc) return {};

  return constructMetadata({
    title: doc.metadata.title,
    description: doc.metadata.description,
  });
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = await CMSDAL.getDocBySlug(slug);

  if (!doc) notFound();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <JsonLd />

      <Link
        href="/docs"
        className="text-muted-foreground hover:text-primary mb-8 inline-flex items-center text-sm font-medium transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Handbook
      </Link>

      <div className="mb-12 space-y-4">
        <div className="text-primary flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
          {doc.metadata.category}
        </div>
        <h1 className="text-4xl font-black tracking-tighter md:text-5xl">{doc.metadata.title}</h1>
        <p className="text-muted-foreground text-xl leading-relaxed">{doc.metadata.description}</p>
        <div className="text-muted-foreground pt-4 text-sm">
          Last updated: {format(new Date(doc.metadata.publishedAt), 'MMMM dd, yyyy')}
        </div>
      </div>

      <ContentRenderer content={doc.content} />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await CMSDAL.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}
