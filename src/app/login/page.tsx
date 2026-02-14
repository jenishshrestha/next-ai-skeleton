import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-md duration-500">
        <LoginForm />
      </div>
    </div>
  );
}
