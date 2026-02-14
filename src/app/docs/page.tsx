import Link from 'next/link';
import { Metadata } from 'next';
import { getAllDocs } from '@/features/docs/api/get-doc';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Technical handbook and standards for next-ai-skeleton.',
};

export default async function DocsPage() {
  const docs = await getAllDocs();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 duration-500">
      <div className="space-y-4">
        <h2 className="text-primary text-sm font-medium tracking-widest uppercase">The Handbook</h2>
        <h1 className="text-4xl font-extrabold tracking-tighter md:text-6xl">
          Technical Insight & Standards
        </h1>
        <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed">
          A collection of high-fidelity technical guides and professional standards that power the
          **next-ai-skeleton**.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {docs.map((doc) => (
          <Link key={doc.slug} href={`/docs/${doc.slug}`}>
            <Card className="hover:border-primary/50 group h-full cursor-pointer bg-white/50 shadow-sm backdrop-blur-sm transition-colors dark:bg-zinc-900/50">
              <CardHeader>
                <div className="text-muted-foreground mb-2 text-xs">
                  {new Date(doc.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
                <CardTitle className="group-hover:text-primary text-2xl font-bold tracking-tight transition-colors">
                  {doc.title}
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-2 text-base">
                  {doc.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-primary inline-flex items-center text-sm font-medium transition-transform group-hover:translate-x-1">
                  Read article <span className="ml-1">→</span>
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
