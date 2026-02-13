---
title: Feature Co-location
impact: CRITICAL
impactDescription: Eliminates directory searching and reduces mental overhead.
tags: architecture, organization, fdd
---

## Feature Co-location

Keep all feature-specific code (components, hooks, styles, tests) inside the feature's directory. Treat every feature as a self-contained "mini-app".

**Incorrect (Scattered files):**

```
src/
  components/
    FeedbackList.tsx
  hooks/
    useFeedback.ts
  features/
    feedback/
      page.tsx
```

**Correct (Co-located):**

```
src/
  features/
    feedback/
      components/
        FeedbackList.tsx
      hooks/
        useFeedback.ts
      page.tsx
```
