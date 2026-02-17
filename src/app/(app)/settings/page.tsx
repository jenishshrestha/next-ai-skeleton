import { SettingsForm, ChangePasswordForm } from '@/features/users';
import { SettingsStats } from '@/features/users/components/settings-stats';
import { Separator } from '@/shared/components/ui/separator';
import { getServerSession } from '@/shared/lib/dal/session';
import { PageHeader } from '@/shared/components/layouts/page-header';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  const showPasswordSection =
    session.user &&
    (!('lastLoginMethod' in session.user) || session.user.lastLoginMethod === 'email');

  return (
    <div className="space-y-2">
      <PageHeader>
        <PageHeader.Title>Settings</PageHeader.Title>
        <PageHeader.Description>
          Manage your account settings and preferences.
        </PageHeader.Description>
      </PageHeader>

      <div className="space-y-8 pt-4">
        <SettingsForm initialSession={session} />
        {showPasswordSection && (
          <>
            <Separator />
            <ChangePasswordForm />
          </>
        )}
        <Separator />
        <SettingsStats initialSession={session} />
      </div>
    </div>
  );
}
