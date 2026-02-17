import { AppLayout } from '@/shared/components/layouts/app-layout';
import { cookies } from 'next/headers';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = (await cookieStore).get('sidebar_state')?.value !== 'false';

  return <AppLayout defaultOpen={defaultOpen}>{children}</AppLayout>;
}
