import { FeedbackBoard } from '@/features/feedback';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 transition-colors duration-300 dark:bg-zinc-950">
      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl space-y-6 px-4 py-12 text-center md:py-24">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            The professional{' '}
            <span className="text-primary decoration-primary/30 underline">AI-Ready</span> Next.js
            skeleton.
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Built for developers who want speed, standards, and AI automation. Feature-Driven
            Design, Bun, Shadcn, and custom AI agent instructions out of the box.
          </p>
        </section>

        {/* Demo Section */}
        <section className="border-y bg-white py-16 dark:bg-zinc-900/50">
          <FeedbackBoard />
        </section>
      </main>
    </div>
  );
}
