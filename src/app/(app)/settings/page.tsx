import { SettingsForm, ChangePasswordForm } from '@/features/users';
import { SettingsStats } from '@/features/users/components/settings-stats';
import { Separator } from '@/shared/components/ui/separator';
import { getServerSession } from '@/shared/lib/dal/session';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  const showPasswordSection =
    session.user &&
    (!('lastLoginMethod' in session.user) || session.user.lastLoginMethod === 'credentials');

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

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
