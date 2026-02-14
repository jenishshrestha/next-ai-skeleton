import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-md duration-500">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
