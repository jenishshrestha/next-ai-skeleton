import { Header } from '@/shared/components/header';
import { Footer } from '@/shared/components/footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main id="main-content" className="flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
