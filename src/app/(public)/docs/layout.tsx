import { DocsNavigation } from '@/features/docs';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-24">
      <div className="flex flex-col gap-12 md:flex-row">
        <aside className="w-full flex-shrink-0 md:w-64">
          <DocsNavigation />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
