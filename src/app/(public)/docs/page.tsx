import { CMSDAL } from '@/features/cms/api/cms-dal';
import { ArticleCard } from '@/features/cms/components/article-card';
import { constructMetadata } from '@/shared/lib/metadata';

export const metadata = constructMetadata({
  title: 'Documentation',
  description: 'Everything you need to know about BuildNext.',
});

export default async function DocsPage() {
  const docs = await CMSDAL.getAllDocs();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-black tracking-tight">Handbook</h1>
        <p className="text-muted-foreground text-lg">
          Master the BuildNext stack with our architecturally pure guides.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <ArticleCard key={doc.slug} doc={doc} />
        ))}
      </div>
    </div>
  );
}
