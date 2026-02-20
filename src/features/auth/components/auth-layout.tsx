import Image from 'next/image';
import { Logo } from '@/shared/components/layouts/logo';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative flex flex-col px-4 py-10 lg:px-8">
        <Logo />
        <div className="flex flex-1 items-center justify-center">{children}</div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/login-side.webp"
          alt="Decorative background"
          fill
          className="object-cover dark:brightness-[0.8] dark:grayscale-20"
          priority
        />
      </div>
    </main>
  );
}
