---
title: Server vs Client Component Boundary
impact: CRITICAL
impactDescription: Prevents unnecessary client-side JavaScript and ensures optimal performance in Next.js App Router.
tags: architecture, nextjs, performance, fdd
---

## Server vs Client Component Boundary

By default, all components in the Next.js App Router are **Server Components**. Only add `'use client'` when the component needs interactivity, browser APIs, or React hooks.

### Rules

1. **Push `'use client'` as far down as possible.** Only the leaf components that need interactivity should be client components. Parent layouts and pages should remain server components.

2. **Feature `page.tsx` files should default to Server Components.** If a page needs client-side interactivity, extract the interactive parts into a separate client component and import it.

3. **Never mark a component as `'use client'` just because its parent is a client component.** Children of client components are already client components by inheritance.

**Incorrect (Entire page is client):**

```tsx
// src/features/dashboard/page.tsx
'use client';

import { useSession } from '@/shared/lib/auth-client';

export default function DashboardPage() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Welcome {session?.user.name}</h1>
      <StaticContent /> {/* This could be a server component! */}
    </div>
  );
}
```

**Correct (Split boundary):**

```tsx
// src/features/dashboard/page.tsx (Server Component)
import { auth } from '@/shared/lib/auth';
import { headers } from 'next/headers';
import { DashboardGreeting } from './components/dashboard-greeting';

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <div>
      <DashboardGreeting userName={session?.user.name} />
      <StaticContent /> {/* Stays on the server */}
    </div>
  );
}

// src/features/dashboard/components/dashboard-greeting.tsx
('use client'); // Only this small component is client-side

export function DashboardGreeting({ userName }: { userName?: string }) {
  return <h1>Welcome {userName}</h1>;
}
```

### When to use `'use client'`

| Need                                    | Server or Client? |
| --------------------------------------- | ----------------- |
| `useState`, `useEffect`, `useRef`       | `'use client'`    |
| `onClick`, `onChange`, `onSubmit`       | `'use client'`    |
| Browser APIs (`window`, `localStorage`) | `'use client'`    |
| Data fetching (`fetch`, `db.query`)     | Server Component  |
| Reading `headers()`, `cookies()`        | Server Component  |
| Static content, no interactivity        | Server Component  |
