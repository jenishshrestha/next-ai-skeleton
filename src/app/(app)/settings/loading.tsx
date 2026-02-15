import { Loader2 } from 'lucide-react';

export default function SettingsLoading() {
  return (
    <div className="flex h-[calc(100vh-200px)] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        <p className="text-muted-foreground animate-pulse text-sm font-medium">Loading ...</p>
      </div>
    </div>
  );
}
